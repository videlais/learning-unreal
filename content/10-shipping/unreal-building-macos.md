# Unreal: Building: macOS

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

## System Requirements

### Minimum Hardware Requirements

- Operating System: macOS 12.0 Monterey or later
- Processor: Apple Silicon (M1/M2/M3) or Intel Core i5 or better
- Memory: 16 GB RAM (32 GB recommended for large projects)
- Graphics: Metal-compatible GPU
- Storage: 100+ GB free space (SSD required)
- Xcode: Latest version compatible with your macOS

### Recommended Specifications

- Operating System: macOS 13 Ventura or macOS 14 Sonoma
- Processor: Apple Silicon M2 Pro/Max or Intel Core i9
- Memory: 32 GB RAM or more
- Storage: 500+ GB SSD
- Display: Retina display or external 4K monitor

### Apple Silicon vs Intel

Apple Silicon (M1/M2/M3):

- Native ARM64 support in UE5.0+
- Better performance and battery life
- Runs iOS/iPadOS simulators natively
- Recommended for new Mac purchases

Intel Macs:

- Fully supported in all UE5 versions
- x86_64 architecture
- May require Rosetta 2 for some tools
- Still viable for Unreal development

## Installing Xcode

### Downloading Xcode

Xcode is Apple's development environment and is required for building Unreal projects on macOS.

Option 1: Mac App Store (Recommended):

1.  Open the App Store
2.  Search for Xcode
3.  Click Get or Install
4.  Wait for download (12+ GB, takes 30-60 minutes)
5.  Xcode installs to /Applications/Xcode.app

Option 2: Apple Developer Website:

1.  Go to [Apple Developer Downloads](https://developer.apple.com/download/)
2.  Sign in with your Apple ID (free)
3.  Download Xcode .xip file
4.  Extract and move to Applications folder

### Required Xcode Version

For Unreal Engine 5:

- UE 5.0-5.1: Xcode 13.0 or later
- UE 5.2-5.3: Xcode 14.0 or later
- UE 5.4+: Xcode 14.3 or later (Xcode 15+ recommended)

Check your Xcode version:

    xcodebuild -version

### Installing Xcode Command Line Tools

After installing Xcode, install command line tools:

1.  Open Terminal

2.  Run:

        sudo xcode-select --install

3.  Click Install in the popup dialog

4.  Accept the license agreement

5.  Wait for installation to complete

Verify installation:

    xcode-select -p

Should output: /Applications/Xcode.app/Contents/Developer

### Accepting Xcode License

You must accept the Xcode license agreement:

1.  Open Terminal

2.  Run:

        sudo xcodebuild -license

3.  Read through the license (press Space to scroll)

4.  Type agree when prompted

### Setting Active Developer Directory

Ensure Xcode is set as the active developer directory:

    sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

If you have multiple Xcode versions installed, this selects which one to use.

## Installing Additional Dependencies

### Homebrew (Optional but Recommended)

Homebrew simplifies installing development tools:

1.  Open Terminal

2.  Install Homebrew:

        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

3.  Follow on-screen instructions

4.  Add Homebrew to PATH if using Apple Silicon:

        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"

### CMake

Some Unreal projects use CMake for build configuration:

Via Homebrew:

    brew install cmake

Via Download:

1.  Download from [cmake.org](https://cmake.org/download/)
2.  Install the .dmg package

Verify installation:

    cmake --version

### Git

Git is required for version control and source builds:

Via Homebrew (recommended):

    brew install git

Via Xcode Command Line Tools (already included):

    git --version

### .NET SDK

Some Unreal tools require .NET:

1.  Download .NET 6.0 SDK from [Microsoft .NET Downloads](https://dotnet.microsoft.com/download)
2.  Download the macOS installer
3.  Install the .pkg file

Verify installation:

    dotnet --version

## Setting Up Unreal Engine 5

### Epic Games Launcher Installation

1.  Download Epic Games Launcher from [unrealengine.com](https://www.unrealengine.com/download)
2.  Open the downloaded .dmg file
3.  Drag Epic Games Launcher to Applications
4.  Launch and sign in with your Epic Games account

### Installing Unreal Engine 5

1.  Open Epic Games Launcher
2.  Navigate to Unreal Engine tab
3.  Click Library in the sidebar
4.  Click the + (Plus) icon next to Engine Versions
5.  Select UE5 version (e.g., 5.3, 5.4)
6.  Click Install
7.  Choose installation location (requires ~60-80 GB)
8.  Installation takes 1-2 hours depending on internet speed

### Source Code Installation (Advanced)

For engine source code access:

1.  Link your GitHub account to Epic Games account

2.  Accept invitation to Unreal Engine GitHub repository

3.  Clone the repository:

        git clone https://github.com/EpicGames/UnrealEngine.git
        cd UnrealEngine

4.  Run setup script:

        ./Setup.sh

5.  Generate project files:

        ./GenerateProjectFiles.sh

6.  Open UE5.xcworkspace in Xcode

7.  Build the project (takes 1-4 hours first time)

## Configuring macOS for Development

### Increase File Descriptor Limit

Unreal Engine can hit macOS file descriptor limits during builds:

1.  Edit (or create) ~/.zshrc:

        nano ~/.zshrc

2.  Add these lines:

        ulimit -n 10240

3.  Save and exit (Ctrl+X, then Y, then Enter)

4.  Apply changes:

        source ~/.zshrc

### Disable Gatekeeper for Development Builds

To run locally built Unreal executables:

    sudo spctl --master-disable

Warning: This reduces security. Re-enable after development:

    sudo spctl --master-enable

Alternatively, allow specific apps:

    xattr -cr /path/to/YourApp.app

### Adjust System Settings for Performance

Disable App Nap for Unreal Editor:

1.  Locate Unreal Editor in Finder
2.  Right-click → Get Info
3.  Check Prevent App Nap

Increase Swap Space (if low RAM):

1.  Monitor with Activity Monitor
2.  Consider upgrading RAM to 32 GB for better performance

## Building Your Unreal Project

### Opening Project in Editor

For standard development:

1.  Launch Epic Games Launcher
2.  Go to Library → My Projects
3.  Click Launch on your project
4.  OR: Browse to .uproject file and double-click

### Generating Xcode Project

To edit C++ code or build from Xcode:

1.  Right-click your .uproject file in Finder
2.  Select Services → Generate Xcode Project
3.  Wait for generation (creates .xcworkspace file)

If the context menu option is missing:

    cd /path/to/your/project
    /Path/To/UnrealEngine/Engine/Build/BatchFiles/Mac/GenerateProjectFiles.sh -project="$(pwd)/YourProject.uproject" -game

### Building from Xcode

After generating the workspace:

1.  Open the .xcworkspace file (NOT .xcodeproj)
2.  Select scheme from the scheme menu:
    - YourProjectEditor (for development)
    - YourProject (for game builds)
3.  Select My Mac as the destination
4.  Click Product → Build (⌘+B)
5.  Wait for compilation (5-30 minutes depending on project)

### Building from Command Line

Alternative to Xcode GUI:

    cd /Path/To/UnrealEngine/Engine/Build/BatchFiles/Mac
    ./Build.sh YourProjectEditor Mac Development -project="/Path/To/YourProject.uproject"

Parameters:

- YourProjectEditor: Target name
- Mac: Platform
- Development: Configuration (Debug, Development, Shipping)
- -project: Path to .uproject file

### Build Configurations

Available build configurations:

Debug: Full debugging, very slow

- Use only for specific debugging scenarios
- Heavy performance impact

DebugGame: Debugging with some optimizations

- Good for debugging game logic
- Better performance than Debug

Development: Balanced development build

- Recommended for day-to-day work
- Good performance with debugging capability

Development Editor: Development with editor integration

- Default for Unreal Editor work
- Most commonly used for macOS development

Shipping: Optimized for distribution

- Maximum performance
- No debugging symbols
- Final release builds

Test: Like Shipping with profiling

- Pre-release testing
- Performance profiling enabled
