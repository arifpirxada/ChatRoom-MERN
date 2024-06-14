import React from "react";
import { render, screen } from "@testing-library/react"
import Login from "../src/components/Login"

// How to integrate with jest & testing-library with vite react:
// https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd
// https://github.com/ozcanzaferayan/vite-jest-integration/commit/68af95d37849d7cfc6fbd5b005b6e8481896e287#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519

test("test for existance of signup inputs", () => {
    render(<Login />);
    
    let nameElement = screen.getByPlaceholderText("Name");
    expect(nameElement).toBeInTheDocument()
})