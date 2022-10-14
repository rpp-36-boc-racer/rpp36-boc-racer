/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SendImage from "../SendImage";

describe("upload image component", () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();
  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    window.URL.revokeObjectURL.mockReset();
  });

  test("image preview", async () => {
    render(<SendImage />);
    const file = new File(["(⌐□_□)"], "somefile.png", { type: "image/png" });
    const inputEl = screen.getByTestId("select-img");

    await fireEvent.change(inputEl, { target: { files: [file] } });
    expect(screen.getByRole("img")).toBeInTheDocument();

    const removeButton = screen.getAllByRole("button")[0];
    await fireEvent.click(removeButton);
    expect(screen.queryByRole("img")).toBe(null);
  });

  test.todo("upload image to S3 to get url");
});
