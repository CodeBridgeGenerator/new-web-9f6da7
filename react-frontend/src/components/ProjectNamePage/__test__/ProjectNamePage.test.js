import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectNamePage from "../ProjectNamePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectName page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectNamePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectName-datatable")).toBeInTheDocument();
    expect(screen.getByRole("projectName-add-button")).toBeInTheDocument();
});
