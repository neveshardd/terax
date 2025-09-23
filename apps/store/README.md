# Terax - A Full-Stack E-commerce Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat&logo=turborepo&logoColor=white)](https://turbo.build/repo)

Terax is a robust, full-stack monorepo designed for building a modern e-commerce platform. It leverages a micro-frontend architecture with distinct applications for authentication, the main store, and a dedicated backend API. The project emphasizes code reusability, maintainability, and scalability through shared packages and efficient monorepo management with Turborepo.

## ✨ Features

Terax provides a comprehensive set of features for a modern e-commerce experience:

*   **Comprehensive User Authentication**: Secure user registration, login, and password recovery functionalities.
*   **E-commerce Storefront**: Intuitive product browsing with categories and detailed product pages.
*   **Shopping Cart & Checkout**: Seamless shopping cart management and a streamlined checkout process.
*   **Backend RESTful API**: A robust Fastify-based API for handling user data, authentication, product information, and order management.
*   **Shared UI Components**: A dedicated UI library (`@terax/ui`) for consistent design and enhanced development speed across all frontend applications.
*   **Standardized Development Experience**: Enforced code quality and consistency using shared ESLint and TypeScript configurations.
*   **Efficient Monorepo Management**: Optimized build and development workflows powered by Turborepo.
*   **Dynamic Routing**: Support for dynamic routing for product categories and individual product pages.
*   **Informational Pages**: Dedicated pages for Terms of Service and Privacy Policy.
*   **Database Integration**: Reliable data persistence managed via Prisma ORM.

## 🚀 Getting Started

Follow these instructions to set up and run the Terax project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (v8 or higher recommended) or pnpm
*   Git
*   A PostgreSQL or compatible database for Prisma

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/neveshardd/terax.git
    cd terax
    ```

2.  **Install dependencies:**
    This monorepo uses Turborepo. Install all root and workspace dependencies:

    ```bash
    npm install
    # or if you prefer pnpm
    # pnpm install
    ```

3.  **Database Setup:**
    Navigate to the `apps/fastify` directory, configure your database connection string in an `.env` file (e.g., `DATABASE_URL="postgresql://user:password@localhost:5432/terax_db"`), and then run Prisma migrations to set up your database schema:

    ```bash
    cd apps/fastify
    npx prisma migrate dev --name init
    # You might also want to seed your database if seed scripts are available
    # npx prisma db seed
    cd ../.. # Go back to the root directory
    ```

4.  **Environment Variables:**
    Each application (e.g., `apps/auth`, `apps/store`, `apps/fastify`) may require its own `.env` file for configuration (e.g., API URLs, database connection strings, authentication secrets). Refer to the respective application directories for examples or required variables.

    *   For `apps/auth` and `apps/store`, you'll likely need `NEXT_PUBLIC_API_URL` pointing to your Fastify backend and `NEXT_PUBLIC_WEB_URL` for redirects.
    *   For `apps/fastify`, you'll need `DATABASE_URL` and potentially `JWT_SECRET`.

### Usage

To start all applications in development mode (frontend applications and the backend API), run the following command from the project root:

```bash
npm run dev
# or with pnpm
# pnpm run dev
```

This command leverages Turborepo to concurrently start:
*   **Authentication App:** Typically available at `http://localhost:3000` (or another port if configured).
*   **Storefront App:** Typically available at `http://localhost:3001` (or another port if configured).
*   **Fastify Backend API:** Typically available at `http://localhost:8080` (or another port if configured).

You can then access the e-commerce store and authentication pages in your browser.

## 🛠️ Tech Stack

Terax is built using a modern and powerful tech stack:

### Languages
*   TypeScript
*   JavaScript
*   SQL (via Prisma schema)

### Frameworks & Libraries
*   **Frontend**:
    *   [Next.js](https://nextjs.org/): React framework for production.
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
    *   [Shadcn/ui](https://ui.shadcn.com/): Re-usable components built with Radix UI and Tailwind CSS.
*   **Backend**:
    *   [Fastify](https://www.fastify.io/): A fast and low-overhead web framework for Node.js.
*   **ORM**:
    *   [Prisma ORM](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript.
*   **Monorepo Management**:
    *   [Turborepo](https://turbo.build/repo): High-performance build system for JavaScript and TypeScript monorepos.

### Development Tools
*   [ESLint](https://eslint.org/): Pluggable JavaScript linter.
*   [Prettier](https://prettier.io/): An opinionated code formatter.

### Core Dependencies

*   `fastify`: Fast and low-overhead web framework.

### Development Dependencies

*   `prettier`: Code formatter.
*   `turbo`: Turborepo monorepo manager.
*   `typescript`: TypeScript language.

## 📂 Project Structure

The project is organized as a monorepo, separating applications (`apps/`) and shared packages (`packages/`).

```
terax/
├── apps/
│   ├── auth/              # Next.js application for user authentication (login, register, forgot password)
│   │   ├── src/
│   │   │   ├── app/       # Next.js App Router structure
│   │   │   └── hooks/     # Custom React hooks
│   │   └── ...
│   ├── fastify/           # Fastify backend API server
│   │   ├── src/
│   │   │   ├── routes/    # API routes (auth, users, etc.)
│   │   │   ├── middlewares/ # Authentication middleware
│   │   │   ├── configs/   # Server configurations (router, env, prisma)
│   │   │   └── exceptions/ # Custom exception handling
│   │   ├── prisma/        # Prisma schema and migrations
│   │   └── ...
│   └── store/             # Next.js application for the e-commerce storefront
│       │   ├── src/
│       │   │   ├── app/   # Next.js App Router structure (cart, checkout, product pages)
│       │   │   ├── components/ # Store-specific components
│       │   │   └── lib/   # Utility functions
│       │   ├── public/    # Static assets (product images, etc.)
│       │   └── ...
├── packages/
│   ├── eslint-config/     # Shared ESLint configurations for consistent code style
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/                # Shared React UI component library (e.g., button, card)
│       │   ├── src/
│       │   │   └── ...    # Individual UI components
│       │   └── ...
├── turbo.json             # Turborepo configuration for monorepo tasks
├── package.json           # Root package.json with monorepo scripts
└── README.md              # Project README
```

## 🤝 Contributing

We welcome contributions to the Terax project! If you're interested in improving this platform, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure they adhere to the project's coding standards (run `npm run lint` and `npm run format`).
4.  Write clear, concise commit messages.
5.  Push your branch and open a pull request.

Please ensure your pull requests are well-described and include any relevant issue numbers.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.