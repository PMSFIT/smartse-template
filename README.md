![prostep ivip logo](doc/modules/ROOT/assets/images/prostep_logo.svg)

# smartse-template

[![Build](https://github.com/PMSFIT/smartse-template/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/PMSFIT/smartse-template/actions/workflows/build.yml)
[![Tests](https://github.com/PMSFIT/smartse-template/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/PMSFIT/smartse-template/actions/workflows/test.yml)
[![Documentation](https://github.com/PMSFIT/smartse-template/actions/workflows/docs.yml/badge.svg?branch=main)](https://github.com/PMSFIT/smartse-template/actions/workflows/docs.yml)

Template for prostep ivip SmartSE Usecase Cluster Repositories.

This repository serves as a template for usecase cluster documentation repositories
in the prostep ivip SmartSE project. It provides a standardised structure for:

- **Documentation** (Antora-based, in the `doc/` directory)
- **Source code** for building model artefacts (in the `src/` directory)
- **Models** in SysML, SSP, Modelica, and Simulink formats (in the `models/` directory)
- **Testing** infrastructure and test cases (in the `testing/` directory)

## Repository Structure

```
.
├── antora-playbook.yml     # Antora site build configuration
├── CMakeLists.txt          # Top-level CMake build file
├── doc/                    # Antora documentation component
│   ├── antora.yml          # Antora component descriptor
│   └── modules/
│       ├── ROOT/           # General / landing documentation
│       ├── usecases/       # Use case documentation
│       ├── showcases/      # Show case documentation
│       └── models/         # Model documentation
├── models/                 # Model files
│   ├── sysml/              # SysML models
│   ├── ssp/                # SSP models
│   ├── modelica/           # Modelica models
│   └── simulink/           # Simulink models
├── src/                    # Source code for building model artefacts
└── testing/                # Test cases and testing infrastructure
```

## Documentation

The documentation is built using [Antora](https://antora.org/). The doc directory
contains a single Antora component with the following modules:

| Module      | Purpose |
|-------------|---------|
| `ROOT`      | Landing page, general cluster documentation |
| `usecases`  | Detailed use case descriptions |
| `showcases` | Showcase demonstrations using example models and source code |
| `models`    | Documentation of models contained in the `models/` directory |

The built documentation is available via github pages [here](https://pmsfit.github.io/smartse-template).

### Building the Documentation

```bash
cmake -B build
cmake --build build --target docs
```

Or directly with Antora:

```bash
npx antora antora-playbook.yml
```

The generated site is written to `build/site/`.

## Build System

All build processes are CMake-based. The CMake configuration discovers and
includes each subdirectory automatically.

```bash
cmake -B build
cmake --build build
```

## Getting Started with This Template

1. Clone or use this template to create a new repository.
2. Update `antora-playbook.yml` with the correct repository URL and branch.
3. Update `doc/antora.yml` with the correct component name, title, and version.
4. Replace placeholder content in `doc/modules/` with actual documentation.
5. Add model files to the appropriate subdirectories under `models/`.
6. Add source code to subdirectories under `src/`.
7. Add test cases and infrastructure to `testing/`.
