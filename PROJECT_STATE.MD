# PROJECT STATE

> AI ENGINEER STATE DIRECTIVE
>
> Before beginning substantial work:
> 1. Read this file.
> 2. Confirm the active Work Unit and dependencies.
> 3. Inspect relevant implementation if state accuracy is uncertain.
>
> During work:
> 4. Stay within the defined Work Unit unless a dependency requires controlled expansion.
> 5. Do not silently change architecture, requirements, business rules, or decisions.
>
> Before progressing:
> 6. Validate the current Work Unit.
> 7. Do not mark work VALIDATED without evidence.
>
> After meaningful progress:
> 8. Update this file.
> 9. Record new decisions, blockers, issues, assumptions, technical debt, and dependency changes.
> 10. Define one precise next action.

---

## 1. State Metadata

```yaml
project: Mzansi Market Online
project_type: E-Commerce Marketplace and Order Fulfilment System
state_version: 2
last_updated: 2026-08-25T09:53:00+02:00
updated_by: AI Software Engineer - reseller role baseline update
current_phase: PH-00 Project Initialization and Design Baseline
system_maturity: pre-implementation
active_work_unit: INIT-001
repository_branch: NOT_CREATED
repository_revision: N/A
team_mode: MULTI_ENGINEER
overall_status: IN_PROGRESS
production_readiness: NOT_READY
```

**State authority:** This file records current operational truth. Planned work is not implemented work; implemented work is not validated work; validated work is not deployed work.

---

## 2. Project Objective

Mzansi Market Online will replace fragmented social-media, telephone and spreadsheet-based retail operations with a secure, accessible and responsive e-commerce marketplace and order-fulfilment system.

The target system must provide a centralized source of truth for:

- product discovery and catalogue data;
- customer registration and authentication;
- carts and checkout;
- authoritative pricing, promotions and delivery charges;
- payment-status recording through sandbox services only;
- stock validation, reservation and fulfilment;
- order tracking;
- returns and refund requests;
- sales, stock and fulfilment reporting;
- role-based administration;
- auditability, monitoring and recovery.

Primary user roles:

1. Customer
2. Reseller / Seller
3. Product Administrator
4. Order Fulfilment Employee
5. Business Manager
6. System Administrator

**Reseller / Seller:** An external marketplace seller who authenticates into the platform to sell products. The reseller is a distinct authorization boundary from the internal Product Administrator. Exact reseller permissions for catalogue, pricing, stock, promotions, order visibility and storefront management require formal validation during requirements modelling.

---

## 3. Current System Snapshot

### Frontend

**State:** DESIGNED_UNVALIDATED

Current design work includes role-based desktop/mobile mock-ups and workflow concepts for customer, product/seller administration, business management and system administration.

No production frontend implementation is recorded in this state.

### Backend

**State:** NOT_STARTED

Business processes and preliminary API responsibilities are defined at design level, including authentication, products, cart, orders, fulfilment, payment status, returns and reporting.

No backend runtime or API implementation is recorded.

### Data

**State:** DESIGN_IN_PROGRESS

The target relational model includes users, roles, customer profiles, addresses, products, categories, inventory, carts, orders, payments, shipments, returns, promotions and audit entries.

No database migration has been executed or validated.

### Infrastructure

**State:** PLANNED

A 13-layer production stack has been identified conceptually:

1. Frontend
2. Backend Logic and APIs
3. Database Storage
4. Authentication and Permissions
5. Hosting and Deployment
6. Cloud and Compute
7. CI/CD and Version Control
8. Security and Row-Level Security
9. Rate Limiting
10. Caching and CDN
11. Load Balancing and Scaling
12. Error Tracking and Logs
13. Availability and Recovery

Vendor technologies, environments and capacity targets are not yet validated in the project state.

### External Services

**State:** PLANNED

- Sandbox payment gateway required.
- Notification service expected.
- Product-image/object storage expected.
- No real payment-card processing is permitted.
- Provider selections are not yet finalized.

---

## 4. Architecture Snapshot

**Architecture Status:** CONCEPTUAL_BASELINE

**Architecture Style:** Layered/modular e-commerce architecture; final implementation style requires team approval.

**Frontend:** Technology not yet selected/recorded.

**Backend/API:** REST-oriented application API planned; technology not yet selected/recorded.

**Database:** Relational database required; specific engine not yet recorded as an approved decision.

**Authentication:** Role-based authentication and authorization required.

**Authorization:** Customer, Reseller / Seller, Product Administrator, Fulfilment Employee, Business Manager and System Administrator boundaries must be enforced. Reseller data access must be scoped so one seller cannot view or modify another seller's protected catalogue, stock, order or business data unless explicitly authorised.

**Security:** Least privilege, secure data handling, validation, audit logging and row-level/scoped data access are production requirements.

**Storage:** Object/media storage planned for product images and documents.

**Caching/CDN:** Planned for hot catalogue data and static/media assets.

**Scaling:** Load balancing and horizontal scaling planned for production hardening.

**Observability:** Centralized logs, exception tracking, audit logs and alerts planned.

**Recovery:** Backups, restore validation, health checks and failover/recovery procedures planned.

### Critical Boundaries

```text
Client
  ↓
Frontend
  ↓
API / Application Boundary
  ↓
Authentication + Authorization + Rate Limits
  ↓
Business Services
  ├── Catalogue
  ├── Cart / Checkout
  ├── Orders
  ├── Inventory
  ├── Payment Status
  ├── Fulfilment
  ├── Returns / Refunds
  ├── Reporting
  └── Notifications
  ↓
Persistence / Object Storage / Audit
  ↓
Database + External Sandbox Services
```

### Production-Layer Readiness

| Layer | Current State | Evidence / Next Requirement |
|---|---|---|
| Frontend | DESIGNED_UNVALIDATED | Role-based mock-ups exist; implementation stack TBD |
| Backend Logic & APIs | PLANNED | Preliminary API responsibilities exist |
| Database Storage | DESIGN_IN_PROGRESS | Entity model required before migrations |
| Auth & Permissions | PLANNED | Role boundaries defined |
| Hosting & Deployment | NOT_STARTED | Provider/environment TBD |
| Cloud & Compute | NOT_STARTED | Runtime model TBD |
| CI/CD & Version Control | READY_TO_START | Shared Git repository required |
| Security & RLS | DESIGN_IN_PROGRESS | Threat controls and data access rules must be formalized |
| Rate Limiting | PLANNED | Limits/strategy TBD |
| Caching & CDN | PLANNED | Cache keys/invalidation/CDN provider TBD |
| Load Balancing & Scaling | PLANNED | Capacity targets not yet defined |
| Error Tracking & Logs | PLANNED | Tooling/retention/alerts TBD |
| Availability & Recovery | PLANNED | Backup/RTO/RPO/failover requirements TBD |

---

## 5. Current Phase

**Phase:** PH-00 — Project Initialization and Design Baseline

**Objective:** Establish one controlled project baseline, divide work into phases and bounded Work Units, assign team ownership, and prepare the project to execute the required four-week analysis/design plan without beginning implementation prematurely.

**Status:** IN_PROGRESS

### Exit Criteria

- `PROJECT_STATE.md` accepted as the authoritative running-state file.
- Team members and responsibilities recorded.
- Shared repository or controlled workspace created.
- Branching/review convention agreed.
- Phase IDs and Work Unit ID convention agreed.
- Phase 1 backlog created and assigned.
- Source assignment/design brief linked as baseline.
- No implementation begins before the design-review gate.

---

## 6. Active Work Unit

**ID:** INIT-001

**Objective:** Establish the operational project baseline and phase execution model.

**Status:** IN_PROGRESS

### Dependencies

- Assignment brief available — SATISFIED
- AI-SWE-002A state standard available — SATISFIED
- Team roster — REQUIRED / NOT_RECORDED
- Repository/workspace — REQUIRED / NOT_RECORDED

### Scope

- establish authoritative project state;
- define phases and gates;
- define work-unit naming;
- define team coordination rules;
- identify current readiness and blockers;
- identify the next executable unit.

### Expected Changes

- create `/PROJECT_STATE.md`;
- create repository/project-board structure;
- record team ownership;
- create Phase 1 work units;
- create decision and assumption registers.

### Acceptance Criteria

- one authoritative running-state file exists;
- current phase and active Work Unit are explicit;
- planned vs validated state is not conflated;
- all major dependencies and blockers are visible;
- exact next action is recorded;
- team members can continue work without reconstructing context from chat history.

### Validation Method

- team review against AI-SWE-002A structure;
- verify state against the assignment brief;
- confirm that no unimplemented feature is marked implemented or validated;
- confirm that the phase plan respects the design-first gate.

### Files / Components In Scope

- `/PROJECT_STATE.md`
- project repository/workspace
- project board/backlog
- design baseline documents

### Team Workstream Rule

Parallel team work is allowed only when Work Units are dependency-safe. Each Work Unit must have one owner, a status, acceptance criteria and validation evidence. Material architecture or requirements changes must be recorded before dependent work proceeds.

---

## 7. Validated Completed Work

No implementation Work Unit is currently recorded as **VALIDATED**.

### Design Artifacts Present but Not Yet Formally Validated

The project has generated design material for:

- product administration workflows;
- business manager workflows;
- system-wide UML concepts;
- customer mobile/desktop mock-ups;
- seller/product-admin mobile/desktop mock-ups;
- system-admin and business-manager mobile mock-ups;
- production-stack conceptual visuals.

**Status:** DESIGNED_UNVALIDATED

These artifacts must not be treated as approved implementation baselines until reviewed for consistency with the SRS, business rules, data model and traceability matrix.

---

## 8. Pending Work

### READY

#### PH-01 — Discover and Define
- `DISC-001` Scenario analysis
- `DISC-002` Project charter
- `DISC-003` Stakeholder map
- `DISC-004` Requirements-gathering plan
- `DISC-005` Scope, assumptions, constraints and success measures

#### GOV-001 — Team and Repository Setup
- create shared Git repository / controlled workspace;
- record team members;
- assign owners;
- define branch and pull-request review policy;
- create project board;
- add `PROJECT_STATE.md` at repository root.

### WAITING

#### PH-05 — Implementation Foundation
Blocked by `GATE-001` Design Approval.

#### PH-06 — Core Marketplace Implementation
Blocked by validated foundation, authentication, database schema and API contracts.

#### PH-07 — Fulfilment and After-Sales Implementation
Blocked by validated order, inventory and payment-status flows.

#### PH-08 — Administration, Reporting and Audit
Blocked by validated transactional core and role authorization.

#### PH-09 — Production Hardening
Blocked by feature integration and baseline automated tests.

#### PH-10 — Staging, UAT and Release
Blocked by security, performance, recovery and traceability gates.

### PLANNED

#### PH-02 — Requirements and Process Modelling
- SRS
- ≥25 functional requirements
- ≥10 non-functional requirements
- business rules
- ≥18 user stories
- acceptance criteria
- ≥25-item prioritized backlog
- current-state process model
- proposed-state process models

#### PH-03 — Solution and Data Design
- system use-case model
- detailed use cases
- activity diagrams
- sequence diagrams
- domain class diagram
- ERD
- data dictionary
- algorithms
- high-level architecture
- preliminary API design

#### PH-04 — Interface, Security, Testing and Presentation
- ≥10 annotated wireframes
- responsive/mobile variants
- threat and control register
- test strategy
- ≥20 test cases
- requirements traceability matrix
- final design review
- presentation

#### GATE-001 — Design Approval
Required before development begins.

#### PH-05 — Development Foundation
- repository/application skeleton
- environment configuration
- database migrations
- authentication/authorization foundation
- baseline API structure
- automated test harness
- CI pipeline

#### PH-06 — Core Marketplace
- customer registration/login
- product browse/search/filter
- product details
- cart
- authoritative pricing/discount calculation
- checkout
- sandbox payment-status recording
- order creation

#### PH-07 — Inventory, Fulfilment and After-Sales
- stock validation/reservation
- paid-order queue
- pick/pack/dispatch
- fulfilment status
- order tracking
- cancellation
- return requests
- refund workflow

#### PH-08 — Administration, Reporting and Audit
- catalogue administration
- category/price/image metadata
- promotions
- stock administration
- business reports/KPIs
- system user/role management
- immutable/controlled audit trail

#### PH-09 — Production Hardening
- security review
- row-level/scoped access validation
- rate limiting
- caching and CDN
- load balancing
- autoscaling
- centralized logging
- error tracking
- backup and restore
- health checks
- recovery testing
- performance testing

#### PH-10 — Staging, UAT and Release
- staging deployment
- integration test pass
- E2E pass
- accessibility validation
- security validation
- performance/capacity evidence
- recovery validation
- UAT
- release approval
- demonstration/production-like deployment

### DEFERRED

No features are formally deferred yet. Items may only move here with a recorded reason and impact.

---

## 9. Dependency State

```text
PH-00 Project Initialization
        ↓
PH-01 Discover & Define
        ↓
PH-02 Requirements & Process Modelling
        ↓
PH-03 Solution & Data Design
        ↓
PH-04 Interface + Security + Test Design
        ↓
GATE-001 Facilitator / Design Approval
        ↓
PH-05 Development Foundation
        ↓
PH-06 Core Marketplace
        ↓
PH-07 Fulfilment & After-Sales
        ↓
PH-08 Admin + Reporting + Audit
        ↓
PH-09 Production Hardening
        ↓
PH-10 Staging + UAT + Release
```

### Critical Dependency Rules

- Implementation cannot begin before `GATE-001`.
- Checkout depends on validated product, price and stock rules.
- Payment-status handling depends on order creation and sandbox payment integration.
- Fulfilment depends on paid-order status and inventory reservation.
- Returns/refunds depend on an original eligible order.
- Reporting depends on reliable transactional and audit data.
- Production deployment depends on security, data, performance, recovery and observability validation.

---

## 10. Decision Register

### DEC-001 — Use One Authoritative Running Project State

**Decision:** Maintain one `/PROJECT_STATE.md` as the authoritative operational snapshot.

**Reason:** Prevent context loss, state drift and duplicated project truth across team/AI sessions.

**Status:** ACTIVE

**Impact:** Every meaningful validated change must update this file.

### DEC-002 — Enforce Design-First Development Gate

**Decision:** No full implementation begins until the requirements, models, database design and wireframes are reviewed.

**Reason:** Required by the project brief and protects implementation from unapproved design drift.

**Status:** ACTIVE

**Impact:** Development phases remain WAITING until `GATE-001` passes.

### DEC-003 — Use the 13-Layer Production Readiness Model

**Decision:** Production readiness will be tracked across the 13 layers defined by the project team.

**Status:** ACTIVE

**Impact:** A functionally working application cannot be declared production-ready while infrastructure, security, scaling, observability or recovery remain unvalidated.

### DEC-004 — Sandbox Payments Only

**Decision:** Use simulated/sandbox payment services and never store real card numbers.

**Status:** ACTIVE

**Impact:** Payment workflows must record status without handling real card data.

### DEC-005 — Preserve Original Assignment Role Boundaries

**Decision:** The original five assignment roles were treated as the complete authorization model.

**Status:** SUPERSEDED BY DEC-007

**Impact:** Retained for decision history only.

### DEC-007 — Add Reseller / Seller as Sixth User Role

**Decision:** The platform has six user roles. `Reseller / Seller` is a separate authenticated marketplace role for people who sell products on the platform.

**Reason:** Marketplace sellers are external business users and require ownership-scoped permissions distinct from internal Product Administrator permissions.

**Status:** ACTIVE

**Impact:** SRS, user stories, use cases, UML, UI flows, authorization policies, data ownership, database design, API permissions, row-level security, test cases and traceability must include the Reseller / Seller role. System Administrator must not alter business transactions; price/stock changes remain permission-controlled.

### DEC-006 — Controlled Team Execution

**Decision:** Team members work through bounded Work Units with explicit owners, dependencies, review and validation.

**Status:** ACTIVE

**Impact:** Parallel work is allowed only where dependency-safe; material changes require state updates.

---

## 11. Constraints

- Full implementation is blocked until the design-review gate passes.
- Use only fictional/non-sensitive customer data.
- Use sandbox payment services only.
- No real payment-card numbers may be stored.
- Product SKU/code must be unique.
- A product must belong to at least one active category.
- Cart quantities must be greater than zero.
- Orders must contain at least one order item.
- Order totals must use server-side authoritative prices and approved discounts.
- Stock must never be reduced below zero.
- Refund requests must reference an original order and a reason.
- Only authorized roles may modify prices or stock balances.
- Completed/refunded transactions must remain auditable.
- Designs, IDs, roles, statuses, entities and business rules must remain consistent across artefacts.
- The final solution must support accessible and responsive interfaces.
- Secrets, tokens and credentials must never be placed in `PROJECT_STATE.md`.

---

## 12. Assumptions

### ASM-001 — Technology Vendors Not Yet Finalized

**Assumption:** Specific frontend, backend, database, hosting, cloud, cache/CDN, observability and recovery technologies are still to be selected.

**Status:** REQUIRES_VALIDATION

**Impact:** Environment provisioning and implementation tasks cannot be finalized until technology decisions are recorded.

### ASM-002 — Repository Has Not Yet Been Created

**Status:** UNVERIFIED

**Impact:** Team execution and CI/CD evidence cannot begin until repository state is confirmed.

### ASM-003 — No Production Implementation Exists Yet

**Status:** REQUIRES_VALIDATION

**Impact:** All engineering implementation states remain NOT_STARTED unless implementation evidence is supplied.

### ASM-004 — Design Has Not Yet Received Formal Approval

**Status:** REQUIRES_VALIDATION

**Impact:** `GATE-001` remains closed.

### ASM-005 — Capacity Targets Are Not Yet Defined

**Status:** UNVERIFIED

**Impact:** Autoscaling, load balancing, caching and performance acceptance criteria cannot yet be validated.

### ASM-006 — Team Ownership Is Not Yet Recorded

**Status:** UNVERIFIED

**Impact:** Parallel work should not begin until owners and review responsibilities are assigned.

### ASM-007 — Reseller Permission Scope Requires Validation

**Assumption:** Resellers will manage only the products and seller-owned operational data associated with their own seller account/store, while Product Administrators retain internal platform-wide catalogue/governance responsibilities.

**Status:** REQUIRES_VALIDATION

**Impact:** The exact split between Reseller and Product Administrator permissions must be resolved before authorization policies, row-level security, seller APIs and seller database ownership rules are finalized.

---

## 13. Known Issues

No verified implementation defects are currently recorded because implementation has not been established in this state.

### ISSUE-001 — Design Consistency Review Outstanding

**Severity:** MEDIUM

**Description:** Existing UML, mock-ups and architecture visuals have not yet been recorded as having passed a single cross-artifact consistency review. They must also be updated to include the newly confirmed Reseller / Seller role where relevant.

**Impact:** Conflicting terminology, role boundaries, flows or entities could enter implementation.

**Status:** OPEN

**Blocks:** `GATE-001` until review is complete.

---

## 14. Technical Debt

No implementation technical debt is currently recorded.

### DEBT-001 — Production Technology Selection Deferred

**Description:** The project has a complete conceptual production-layer model, but technology/provider choices are not yet recorded.

**Reason Deferred:** Current phase is analysis/design; vendor-neutral selection should follow requirements and architecture validation.

**Target Resolution:** Before `PH-05 Development Foundation`.

---

## 15. Validation State

```text
Assignment Baseline:        AVAILABLE
Running State Structure:    DRAFT_CREATED
Project Charter:            NOT_VALIDATED
SRS:                        NOT_VALIDATED
Process Models:             PARTIAL / UNVALIDATED
UML:                        PARTIAL / UNVALIDATED
Database Design:            NOT_VALIDATED
Wireframes:                 PARTIAL / UNVALIDATED
Architecture:               CONCEPTUAL / UNVALIDATED
API Design:                 NOT_VALIDATED
Security Review:            NOT_RUN
Build:                      NOT_STARTED
Unit Tests:                 NOT_STARTED
Integration Tests:          NOT_STARTED
E2E Tests:                  NOT_STARTED
Accessibility Tests:        NOT_STARTED
Performance Tests:          NOT_STARTED
Recovery Tests:             NOT_STARTED
Production Readiness:       NOT_READY
```

### Validation Principle

A Work Unit may move:

```text
PLANNED
  ↓
READY
  ↓
IN_PROGRESS
  ↓
IMPLEMENTED_UNVERIFIED
  ↓
VALIDATED
```

Only evidence-backed validation permits `VALIDATED`.

---

## 16. Environment & Deployment State

```text
Development:        NOT_PROVISIONED / NOT_RECORDED
Test:               NOT_PROVISIONED
Staging:            NOT_PROVISIONED
Production:         NOT_PROVISIONED

Repository:         NOT_RECORDED
CI:                 NOT_CONFIGURED
CD:                 NOT_CONFIGURED

Database Migration: NOT_STARTED
Object Storage:     NOT_CONFIGURED
Sandbox Payment:    NOT_CONFIGURED
Caching/CDN:        NOT_CONFIGURED
Load Balancer:      NOT_CONFIGURED
Autoscaling:        NOT_CONFIGURED
Observability:      NOT_CONFIGURED
Backups:            NOT_CONFIGURED
Recovery:           NOT_VALIDATED

Latest Deployment:  NONE
Production Status:  NOT_DEPLOYED
```

---

## 17. Recent Material Changes

### 2026-08-25

- State version incremented to 2.
- Added `Reseller / Seller` as the sixth user role and a distinct authorization boundary.
- Superseded DEC-005 with DEC-007 to preserve decision history.
- Added ASM-007 for the unresolved permission split between Reseller and Product Administrator.
- Marked role-sensitive SRS, UML, UI, API, data ownership, RLS and tests for update.
- Initial `PROJECT_STATE.md` structure established from AI-SWE-002A.
- Project phased from design initiation through development, hardening and release.
- 13-layer production readiness model incorporated into operational state.
- Existing design/mock-up work classified as `DESIGNED_UNVALIDATED`, not implemented.
- Design approval established as an explicit development gate.
- Initial decisions, assumptions, blockers and next action recorded.

---

## 18. Blockers

### BLOCK-001 — Design Approval Gate

**Affected Work:** `PH-05` and all implementation phases.

**Problem:** The brief requires requirements, models, database design and wireframes to be reviewed before full implementation.

**Impact:** Implementation may not safely begin.

**Required Resolution:** Complete PH-01 through PH-04 and obtain facilitator/team design approval.

### BLOCK-002 — Team Ownership Not Recorded

**Affected Work:** Parallel team Work Units.

**Problem:** Team names, owners and reviewer assignments have not been provided in the current project state.

**Impact:** Parallel execution risks overlap and unowned dependencies.

**Required Resolution:** Record team roster and assign phase/workstream ownership.

### BLOCK-003 — Repository State Not Recorded

**Affected Work:** Version control, CI/CD, code review and traceability.

**Problem:** Shared repository/workspace creation has not been confirmed.

**Impact:** Implementation and evidence cannot be controlled reliably.

**Required Resolution:** Create/confirm repository and record branch/review conventions.

### BLOCK-004 — Technology Selection Not Finalized

**Affected Work:** PH-05 infrastructure and application skeleton.

**Problem:** The production layers are defined, but exact technologies/providers are not recorded as approved decisions.

**Impact:** Environment provisioning, deployment configuration and infrastructure Work Units cannot be finalized.

**Required Resolution:** Complete architecture technology-selection decision record before PH-05.

---

## 19. Next Action

**Work Unit:** `INIT-001`

**Action:** Confirm the project team roster and create the Phase 1 execution board containing `DISC-001` through `DISC-005`, with one owner and one reviewer assigned to each Work Unit.

**Validation:**
- every Work Unit has an owner;
- dependencies are recorded;
- acceptance criteria are recorded;
- shared repository/workspace is confirmed;
- `/PROJECT_STATE.md` is committed as the authoritative operational state.

**Transition Condition:**

If the initialization review passes:

1. mark `INIT-001` as `VALIDATED`;
2. increment `state_version` to 3;
3. set `current_phase` to `PH-01 Discover and Define`;
4. set `active_work_unit` to the first READY Phase 1 unit;
5. begin execution.

If the initialization review fails:

- keep `INIT-001` `IN_PROGRESS`;
- record the discrepancy as a blocker/issue;
- resolve it before Phase 1 execution.

---

# Phase Execution Summary

| Phase | Name | Primary Outcome | Gate |
|---|---|---|---|
| PH-00 | Project Initialization | State, team, repo, execution rules | Initialization review |
| PH-01 | Discover & Define | Charter, scope, stakeholders | Discovery review |
| PH-02 | Requirements & Process Modelling | SRS, stories, backlog, process models | Requirements review |
| PH-03 | Solution & Data Design | UML, ERD, algorithms, architecture, APIs | Solution review |
| PH-04 | Interface, Security, Testing & Presentation | Wireframes, threats, tests, traceability | Final design review |
| GATE-001 | Design Approval | Approved implementation baseline | Mandatory |
| PH-05 | Development Foundation | Repo skeleton, DB, auth, CI | Foundation validation |
| PH-06 | Core Marketplace | Catalogue, cart, checkout, orders | Integration validation |
| PH-07 | Fulfilment & After-Sales | Stock, fulfilment, tracking, returns | Workflow validation |
| PH-08 | Admin, Reporting & Audit | Admin tools, reports, audit trail | Role/data validation |
| PH-09 | Production Hardening | Security, scale, observability, recovery | Production-readiness gate |
| PH-10 | Staging, UAT & Release | Release candidate and deployment | Release approval |

---

# State Update Rule

After every meaningful, validated change:

1. increment `state_version`;
2. update phase/work-unit status;
3. move only validated work into Section 7;
4. update pending and dependencies;
5. record material decisions;
6. record assumptions that were confirmed or invalidated;
7. record new issues, debt and blockers;
8. update validation/environment state;
9. record recent material changes;
10. end with one precise next action.
