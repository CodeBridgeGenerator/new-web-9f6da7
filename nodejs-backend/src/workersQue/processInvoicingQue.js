const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');
const _ = require('lodash');
const config = require('../resources/config.json');

// Create and export the job queue
const jobQueue = new Queue('invoicingQues', { connection });

// Create and export the worker
const createInvoicingJobWorker = (app) => {
    const worker = new Worker(
        'invoicingQues',
        async (job) => {
            const { data } = job;
            // Add your job processing logic
            console.log(id, data);
        },
        { connection }
    );

    // Event listeners for worker
    worker.on('completed', (job) => {
        console.log(`Job ${job.id} completed successfully`);
        if (job.data) {
            try {
                app.service('invoicingQues').patch(job.data?._id, {
                    end: new Date(),
                    status: true,
                    jobId: job.id
                });
            } catch (error) {
                console.error(error);
                throw Error(error);
            }
        } else {
            console.log(`Job success but ${job.data} data not found`);
        }
    });

    worker.on('failed', async (job, err) => {
        console.error(`Job ${job.id} failed with error ${err.message}`);
        if (job.data) {
            await app.service('invoicingQues').patch(job.data?._id, {
                end: new Date(),
                jobId: job.id,
                error: err.message
            });
            const _mail = {
                name: 'on_invoicing_job_que_worker',
                type: 'invoicings',
                from: 'info@cloudbasha.com',
                recipients: [job?.data?.email],
                status: false,
                subject: 'invoicing processing failed',
                templateId: 'onError'
            };
            app.service('mailQues').create(_mail);
        } else {
            console.log(`Job error and ${job.data} data not found`);
        }
    });

    const invoicingQueService = app.service('invoicingQues');
    invoicingQueService.hooks({
        after: {
            create: async (context) => {
                const { result } = context;
                await jobQueue.add('invoicingQues', result);
                return context;
            }
        }
    });
};

module.exports = { createInvoicingJobWorker };
