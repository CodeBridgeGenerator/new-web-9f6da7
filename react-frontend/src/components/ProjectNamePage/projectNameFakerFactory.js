
import { faker } from "@faker-js/faker";
export default (user,count,ProjectNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ProjectName: ProjectNameIds[i % ProjectNameIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
