cmake_minimum_required(VERSION 3.20)

project(SmartSECluster
    VERSION 0.1.0
    DESCRIPTION "prostep ivip SmartSE Usecase Cluster Repository"
    LANGUAGES NONE
)

# ── Options ───────────────────────────────────────────────────────────────────
option(BUILD_DOCS "Build Antora documentation" ON)

# ── Subdirectories ────────────────────────────────────────────────────────────
add_subdirectory(src)
add_subdirectory(models)
add_subdirectory(testing)

if(BUILD_DOCS)
    add_subdirectory(doc)
endif()
