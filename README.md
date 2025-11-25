# Modern Static Portfolio

Welcome to the repository for my personal static portfolio. This project, which started as a simple course assignment, has evolved into a sophisticated, high-performance showcase of modern web development techniques, built without the overhead of a major framework CLI.

## About This Project

This portfolio demonstrates a modern, component-based architecture using vanilla JavaScript, Preact, and a service-oriented design. The application is fully data-driven, with all content, from project details to UI configuration, managed in centralized data and config files.

It serves as both a personal showcase and a sandbox for experimenting with performance optimization, clean code, and advanced front-end patterns.

**Please Note:** This project prioritizes architectural purity and performance experimentation. For my latest professional work, please refer to the links within the portfolio itself.

---

## Key Features

- **Component-Based Architecture:** Built with Preact and HTM for a modern, reusable UI structure.
- **Service-Oriented Design:** Logic is decoupled into dedicated services for concerns like asset loading, data fetching, and animations.
- **Data-Driven Content:** All text, project data, and configurations are externalized into `*.json` and `*.js` files, allowing for easy updates without touching the application logic.
- **High-Performance Animations:** Uses GSAP (GreenSock Animation Platform) and ScrollTrigger for smooth, efficient animations.
- **Lazy Loading:** Page sections and images are lazy-loaded using `lozad.js` to ensure a fast initial page load.
- **Styling with CSS-in-JS:** All styles are generated programmatically using `goober` for a dynamic and maintainable styling system.
- **Schema-Validated Data:** Uses `zod` to validate all incoming data from JSON, ensuring data integrity and preventing runtime errors.
- **Responsive & Accessible:** Designed to work across all device sizes with accessibility features like ARIA attributes and reduced motion preferences.

---

## Technologies Used

- **Core:** HTML5, CSS3, JavaScript (ES Modules)
- **UI Rendering:** [Preact](https://preactjs.com/) (a fast 3kB alternative to React) with [HTM](https://github.com/developit/htm) (JSX-like syntax in template literals).
- **Styling:** [goober](https://github.com/cristianbote/goober) (a lightweight CSS-in-JS library).
- **Animation:** [GSAP (GreenSock)](https://gsap.com/) with the [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) plugin.
- **Data Validation:** [Zod](https://zod.dev/) for schema validation.
- **Lazy Loading:** [lozad.js](https://github.com/ApoorvSaxena/lozad.js) for performant lazy-loading of elements.
- **Icons:** [Font Awesome](https://fontawesome.com/) and [Simple Icons](https://simpleicons.org/).
- **Utilities:** [clsx](https://github.com/lukeed/clsx) for constructing class names.

---

## How to View

You can view the live demo of this portfolio directly in your browser:

[Live Demo](https://mushfiqplabon.github.io/staticPortfolio/)

---

## Getting Started (for Developers)

This project requires **no build step**.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MushfiqPlabon/StaticPortfolio.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd StaticPortfolio
    ```
3.  **Open `index.html` in your browser:**
    For the best development experience, use a live server extension (like Live Server for VS Code) to get hot-reloading.

---

## License

This project is open-source and available under the [MIT License](LICENSE).