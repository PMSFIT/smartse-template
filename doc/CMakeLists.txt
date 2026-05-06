cmake_minimum_required(VERSION 3.20)

# ── Find Node.js / npx (required to run Antora) ──────────────────────────────
find_program(NPX_EXECUTABLE npx)

if(NOT NPX_EXECUTABLE)
    message(WARNING
        "npx not found. The 'docs' target will not be available.\n"
        "Install Node.js (https://nodejs.org/) to enable documentation builds."
    )
    return()
endif()

set(ANTORA_PLAYBOOK "${CMAKE_SOURCE_DIR}/antora-playbook.yml")
set(DOCS_OUTPUT_DIR "${CMAKE_BINARY_DIR}/site")

# ── Custom target: docs ───────────────────────────────────────────────────────
add_custom_target(docs
    COMMAND ${NPX_EXECUTABLE} antora "${ANTORA_PLAYBOOK}"
    WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
    COMMENT "Building Antora documentation..."
    VERBATIM
)
