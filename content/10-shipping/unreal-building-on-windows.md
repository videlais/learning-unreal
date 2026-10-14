# Unreal: Building on Windows

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

## System Requirements

### Minimum Hardware Requirements

- Operating System: Windows 10 64-bit version 1909 or later
- Processor: Quad-core Intel or AMD, 2.5 GHz or faster
- Memory: 16 GB RAM (32 GB recommended for large projects)
- Graphics Card: DirectX 11 or DirectX 12 compatible graphics card
- Storage: 100+ GB free space (SSD strongly recommended)

### Recommended Specifications

- Operating System: Windows 11 64-bit
- Processor: 8-core Intel or AMD, 3.0 GHz or faster
- Memory: 32 GB RAM or more
- Graphics Card: NVIDIA RTX 2000 series or AMD equivalent
- Storage: 500+ GB NVMe SSD

## Installing Visual Studio

### Required Visual Studio Version

For Unreal Engine 5.0 - 5.4+:

- Visual Studio 2022 (recommended)
- Visual Studio 2019 also supported for UE5.0-5.3

### Downloading Visual Studio

1.  Go to [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)
2.  Download Visual Studio 2022 Community (free) or Professional/Enterprise
3.  Run the installer

### Required Workloads and Components

During Visual Studio installation, select these workloads:

#### Essential Workloads

Desktop development with C++: This is the primary workload required

- Includes MSVC C++ compiler
- Windows SDK
- CMake tools

Game development with C++: Recommended for Unreal development

- Includes Unreal Engine installer (optional, you may already have it)
- Additional game development tools

#### Individual Components to Add

In the Individual Components tab, ensure these are selected:

Compilers and Build Tools:

- MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)
- C++ ATL for latest v143 build tools (x86 & x64)
- C++ MFC for latest v143 build tools (x86 & x64)

SDKs and Libraries:

- Windows 10 SDK (10.0.18362.0 or newer)
- Windows 11 SDK (Latest version)

Debugging and Testing:

- C++ profiling tools
- Just-In-Time debugger

Other Tools:

- C++ CMake tools for Windows
- C++ AddressSanitizer (optional, for debugging)

### Installation Steps

1.  Launch the Visual Studio Installer
2.  Select Visual Studio 2022 Community
3.  Click Modify or Install
4.  In Workloads tab:
    - Check Desktop development with C++
    - Check Game development with C++
5.  Click Individual Components tab
6.  Search and select components listed above
7.  Click Install or Modify
8.  Installation takes 30-60 minutes depending on internet speed

### Verifying Installation

After installation:

1.  Launch Visual Studio 2022
2.  Go to Help → About Microsoft Visual Studio
3.  Verify version is 17.x.x (Visual Studio 2022)
4.  Check installed components include C++ tools

## Installing Required Dependencies

### .NET Framework

Unreal Engine requires .NET for various tools:

1.  Download .NET 6.0 SDK from [Microsoft .NET Downloads](https://dotnet.microsoft.com/download)
2.  Install both x64 and x86 versions
3.  Restart your computer after installation

### DirectX Runtime

Ensure DirectX End-User Runtime is installed:

1.  Download from [Microsoft DirectX End-User Runtime](https://www.microsoft.com/download/details.aspx?id=35)
2.  Run the installer
3.  DirectX is required for shader compilation and rendering

### Visual C++ Redistributables

Install Visual C++ Redistributable packages:

1.  Download Visual C++ Redistributable for Visual Studio 2015-2022
2.  Install both x64 and x86 versions
3.  Available at [Microsoft Visual C++ Downloads](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)
