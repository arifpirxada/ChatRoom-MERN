import React from "react";
import { render, screen } from "@testing-library/react"
import Login from "../src/components/Login"
import Navbar from "../src/components/Navbar";
import ChatRoom from "../src/components/Chatroom";

test("test for existance of login/signup elements", () => {
    render(<Login />);

    let nameElement = screen.getByPlaceholderText("Name");
    expect(nameElement).toBeInTheDocument();

    let emailElements = screen.getAllByPlaceholderText("Email");
    expect(emailElements.length).toBe(2);

    let passElements = screen.getAllByPlaceholderText("Password");
    expect(passElements.length).toBe(2);

    let signupBtn = screen.getByRole("button", { "name": "Sign up" })
    expect(signupBtn).toBeInTheDocument();

    let loginBtn = screen.getByRole("button", { "name": "Login" })
    expect(loginBtn).toBeInTheDocument();

    let loginToggle = screen.getByTestId("login-toggle");
    expect(loginToggle).toBeInTheDocument();

    let signupToggle = screen.getByTestId("signup-toggle");
    expect(signupToggle).toBeInTheDocument();
})

jest.mock('../src/assets/logo.png', () => 'Logo Image');

test("website title existance", () => {
    render(<Navbar setLoginStatus={ true } onlineUsers={ ["test user"] } />);
    expect(screen.getByText("Latracal Chat Room")).toBeInTheDocument()
})

test("existance of message input and send button", () => {
    render(<ChatRoom userName={ "test user" } getOnlineUsers={ () => { } } />);
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
})

test("existance of load previous messages button", () => {
    render(<ChatRoom userName={ "test user" } getOnlineUsers={ () => { } } />);
    expect(screen.getByRole("button", { name: "Load previous messages" })).toBeInTheDocument();
})