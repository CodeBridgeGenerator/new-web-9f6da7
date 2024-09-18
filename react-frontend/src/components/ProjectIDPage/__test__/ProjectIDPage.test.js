import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectIDPage from "../ProjectIDPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectID page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectIDPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectID-datatable")).toBeInTheDocument();
    expect(screen.getByRole("projectID-add-button")).toBeInTheDocument();
});
