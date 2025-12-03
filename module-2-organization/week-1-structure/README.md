# 📁 Week 5: Project Structure & Configuration

## Mục Tiêu | Learning Objectives
- Learn professional test project organization
- Master naming conventions
- Understand configuration management
- Implement test hooks properly
- Create scalable folder structures

## Nội Dung | Content

### 📚 Theory (docs/)
1. **01-project-structure-vi.md** - Folder structure best practices
2. **02-test-organization-vi.md** - Test organization with describe/hooks
3. **03-configuration-management-vi.md** - playwright.config.ts deep dive
4. **04-naming-conventions-vi.md** - Naming standards

### 💻 Examples (examples/)
1. **01-folder-structure.spec.ts** - Good structure patterns
2. **02-test-organization.spec.ts** - describe/hooks usage
3. **03-config-examples.spec.ts** - Configuration patterns
4. **04-naming-patterns.spec.ts** - Naming conventions

### ✏️ Exercises
- **exercise-01-structure.spec.ts** - Organize messy test suite
- **exercise-02-config.spec.ts** - Multi-environment configuration

## File Structure
```
week-1-structure/
├── README.md
├── docs/
│   ├── 01-project-structure-vi.md
│   ├── 02-test-organization-vi.md
│   ├── 03-configuration-management-vi.md
│   └── 04-naming-conventions-vi.md
├── examples/
│   ├── 01-folder-structure.spec.ts
│   ├── 02-test-organization.spec.ts
│   ├── 03-config-examples.spec.ts
│   └── 04-naming-patterns.spec.ts
├── exercises/
│   ├── exercise-01-structure.spec.ts
│   └── exercise-02-config.spec.ts
└── solutions/
    ├── exercise-01-structure.spec.ts
    └── exercise-02-config.spec.ts
```

## Running Tests
```bash
cd module-2-organization/week-1-structure
yarn test examples/
yarn test exercises/
```

## Time Estimate: 6-8 hours
