import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GitHubIndicator } from "../components/GitHubIndicator";

describe("GitHubIndicator", () => {
  it("links to the GitHub repo", () => {
    render(<GitHubIndicator repo="abelazo/impostor" version="v1.2.3" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://github.com/abelazo/impostor",
    );
  });

  it("shows the repo name", () => {
    render(<GitHubIndicator repo="abelazo/impostor" version="v1.2.3" />);
    expect(screen.getByText("abelazo/impostor")).toBeInTheDocument();
  });

  it("shows the version", () => {
    render(<GitHubIndicator repo="abelazo/impostor" version="v1.2.3" />);
    expect(screen.getByText("v1.2.3")).toBeInTheDocument();
  });

  it("renders without a version", () => {
    render(<GitHubIndicator repo="abelazo/impostor" />);
    expect(screen.getByText("abelazo/impostor")).toBeInTheDocument();
  });
});
