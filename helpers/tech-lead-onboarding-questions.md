# Tech Lead Engineer Onboarding Questions

Essential questions to ask when joining a new Angular 16 + Ionic project as a Tech Lead.

## Project Architecture & Structure

- What is the current project architecture pattern? (feature-based, layer-based, modular)
- How are modules organized? (lazy-loaded, eager-loaded)
- What state management solution is used? (NgRx, Akita, services with BehaviorSubject)
- How is the routing structure organized?
- Are there any micro-frontend implementations?
- What is the folder structure convention?

## Technical Stack & Dependencies

- What is the exact Angular version and planned upgrade path?
- Which Ionic version is being used?
- What are the critical third-party dependencies?
- Are there any deprecated dependencies that need migration?
- What UI component library is used beyond Ionic? (Material, custom)
- What backend services/APIs does the app integrate with?

## API & Backend Integration

- Are API endpoints the same across all countries/regions?
- How is API base URL configuration managed per environment/region?
- Are there region-specific endpoints or services?
- How is endpoint routing determined? (by user location, app configuration)
- Is there a gateway/proxy layer for different regions?
- How are API versions managed across regions?
- Are there different SLA/performance requirements per region?
- How is data residency handled? (GDPR, data sovereignty)
- Are there country-specific API features or differences?
- How is failover/redundancy handled for regional endpoints?
- What is the strategy for load balancing across regions?
- How are third-party service integrations managed per country? (payment gateways, analytics)

## Development Workflow

- What is the Git branching strategy? (GitFlow, trunk-based)
- What is the code review process?
- Are there PR templates or contribution guidelines?
- What is the CI/CD pipeline setup?
- How are deployments handled? (environments, automation)
- What is the release cycle/cadence?

## CI/CD & Jenkins

- Is Jenkins used for CI/CD? What version?
- What are the main Jenkins pipelines? (build, test, deploy)
- How are Jenkins jobs configured? (Jenkinsfile, UI-based)
- What are the different build environments? (dev, staging, prod)
- How are build artifacts managed and stored?
- What is the deployment approval process?
- Are there automated rollback mechanisms?
- How are environment variables/secrets managed in Jenkins?
- What build triggers are configured? (webhook, scheduled, manual)
- How are build failures notified to the team?
- Are there parallel builds for different platforms? (iOS, Android)
- What is the average build time per platform?

## Code Quality & Standards

- What linting rules are configured? (ESLint, TSLint legacy)
- Is Prettier or similar formatting tool used?
- Are there pre-commit hooks? (Husky, lint-staged)
- What is the unit test coverage requirement?
- What testing frameworks are used? (Jasmine, Jest, Karma)
- Are E2E tests implemented? (Cypress, Playwright, Protractor)
- Is there a style guide or coding standards document?

## Performance & Optimization

- What are the current performance metrics/benchmarks?
- Are there known performance bottlenecks?
- How is lazy loading implemented?
- Is AOT compilation used in production?
- What bundle size optimization strategies are in place?
- How is image optimization handled?

## Mobile Considerations (Ionic Specific)

- Which platforms are supported? (iOS, Android, Web)
- How is native functionality accessed? (Capacitor, Cordova)
- What is the plugin management strategy?
- How are platform-specific features handled?
- What is the app store deployment process?
- Are there PWA requirements?

## Internationalization (i18n) & Localization

- What i18n library is used? (ngx-translate, @angular/localize, Transloco)
- Which languages/locales are currently supported?
- How are translation files organized? (JSON, XLIFF, separate files per language)
- What is the workflow for adding new translations?
- Who manages translations? (developers, dedicated translators, external service)
- Is there a translation management platform? (Crowdin, Lokalise, POEditor)
- How are missing translations handled? (fallback language, key display)
- Are there region-specific features or content variations?
- How is RTL (Right-to-Left) support handled if applicable?
- How are date, time, and number formats localized?
- How are currency conversions managed?
- Is there lazy loading for language files?
- How are translations tested across different locales?
- Are there any locale-specific regulatory requirements?

## Security

- What authentication/authorization mechanism is used?
- How are API keys and secrets managed?
- Is there a security audit process?
- How are sensitive user data handled?
- What is the HTTPS/SSL configuration?

## Documentation

- Where is the technical documentation maintained?
- Is there API documentation? (Swagger, OpenAPI)
- Are architectural decisions documented? (ADRs)
- Is there onboarding documentation for new developers?
- How is component/service documentation maintained?

## Team & Communication

- What is the team structure and size?
- How are technical decisions made?
- What communication tools are used? (Slack, Teams, Jira)
- How often are sprint planning/retrospectives held?
- Who are the key stakeholders?

## Pain Points & Challenges

- What are the current technical debt items?
- What are the biggest challenges the team faces?
- Are there any blockers or dependencies on other teams?
- What features are in the roadmap?
- What is the most critical area needing improvement?

## Monitoring & Support

- What monitoring/logging tools are in place? (Sentry, LogRocket)
- How are bugs tracked and prioritized?
- What is the incident response process?
- How is user feedback collected?
- What analytics are implemented?

## Environment & Tools

- What are the development environment requirements?
- What IDEs/editors does the team use?
- Are there any required VS Code extensions?
- How is local development setup documented?
- What is the preferred package manager? (npm, yarn, pnpm)
