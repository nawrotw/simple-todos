import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.tsx";

describe("DateInput", () => {

  it("should render proper date", () => {

    render(<App/>);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

});
