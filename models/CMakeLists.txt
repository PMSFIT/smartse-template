cmake_minimum_required(VERSION 3.20)

# ── Model directories ─────────────────────────────────────────────────────────
# Subdirectories for each supported modelling language / format:
#   sysml/     – SysML models
#   ssp/       – SSP (System Structure and Parameterization) packages
#   modelica/  – Modelica models
#   simulink/  – Simulink models
#
# Add build logic (e.g. code generation, FMU export) in the respective
# subdirectory CMakeLists.txt files and uncomment the add_subdirectory calls
# below.

# add_subdirectory(sysml)
# add_subdirectory(ssp)
# add_subdirectory(modelica)
# add_subdirectory(simulink)

message(STATUS "models: no subdirectory builds configured yet")
