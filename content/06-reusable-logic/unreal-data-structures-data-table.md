# Unreal: Data Structures: Data Table

> Legacy lesson, organized for self-study. Screenshots may show an older editor. See the Unreal 5.8 verification scope (legacy attachment omitted) before relying on version-specific steps.

## Data Tables

Data Tables are defined assets that store rows of structured data based on a struct definition. They are very useful for managing large amounts of game data that can be easily edited without modifying Blueprints themselves.

## Creating Data Tables

- First, create a struct that defines the columns of your data table.
- Right-click in the Content Browser and select Miscellaneous → Data Table.
- Select the struct you created as the row structure.
- Open the Data Table to add, edit, or remove rows.

## Accessing Data Tables

- **Get Data Table Row:** Retrieves a specific row by its row name.
- **Get Data Table Row Names:** Returns an array of all row names in the table.
- **Does Data Table Row Exist:** Checks if a specific row name exists.

## Common Use Cases

- **Item Database:** Store all game items with their properties in one table.
- **Enemy Stats:** Define different enemy types with varying health, damage, and behavior.
- **Weapon Properties:** Manage weapon damage, fire rate, ammo capacity, and other stats.
