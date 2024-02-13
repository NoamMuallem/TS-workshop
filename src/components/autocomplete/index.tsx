import { useEffect } from "react";
import { useFilter, UseAutocompleteOptions } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Option, SelectedOptions } from "./components";

export type BaseAutocompleteProps = {
  // the options that are available for choosing, for the best DX, allow array of any type
  options: any;
  // is multi select or single value select
  isMulti: boolean;
  // a function to call when we want to generate a label from an option
  getOptionLabel: any;
  // a function to call when we want to generate an id (string) from an option
  getOptionID: any;
  // a function that receives an option and the search term and returns true if the option matches the search and false otherwise
  filterFunction: any;
  // onChange function, can receive array of options or single option
  onChange: any;
};

// export type MultiOrSingular =
//   // if is multi is true the on change will receive an array of selected options
//   | { isMulti: true; onChange: any }
//   // if is multi is false the on change will receive a single value
//   | { isMulti: false; onChange: any };

export const Autocomplete = ({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
  getOptionLabel,
}: BaseAutocompleteProps) => {
  const { selectedOptions, toggleOption } = UseAutocompleteOptions({
    isMulti,
    getOptionID,
  });

  // On options state change trigger onChange appropriately
  useEffect(() => {
    const allSelectedOptions = Object.values(selectedOptions);

    if (isMulti) {
      const allOptions = allSelectedOptions;
      onChange(allOptions);
      return;
    }

    const singleOption = allSelectedOptions[0];
    onChange(singleOption);
  }, [selectedOptions, isMulti, onChange]);

  const { filter, setFilter, filteredOptions } = useFilter({
    options,
    filterFunction,
  });

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <SelectedOptions
        selectedOptions={selectedOptions}
        isMulti={isMulti}
        getOptionLabel={getOptionLabel}
      />
      <Popover>
        <PopoverTrigger autoFocus>
          <Input
            autoComplete="off"
            className="min-w-full"
            placeholder="Search"
            type="text"
            name="search"
            autoFocus
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          align="start"
          sideOffset={12}
          className="max-h-[300px] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                  key={getOptionID(option)}
                  onClickHandle={() => toggleOption(option)}
                  isSelected={Boolean(selectedOptions[getOptionID(option)])}
                  label={getOptionLabel(option)}
                />
              ))
            ) : (
              <div>No results</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
