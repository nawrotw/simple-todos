import { styled, Button, lighten } from "@mui/material";
import { colors } from "../../styles/colors.ts";

const Root = styled('div')`
    padding: ${({ theme }) => theme.spacing(2, 0, 1)};

    display: grid;
    align-items: center;

    grid-gap: ${({ theme }) => theme.spacing(1)};
    grid-template-columns: auto auto;
    grid-template-areas: 
      "filters filters"
      "counter clearBtn";

    @media (min-width: 400px) {
        grid-template-columns: auto 1fr;
        grid-template-areas: 
      "counter filters"
      "clearBtn filters";
    }
    @media (min-width: 520px) {
        grid-template-columns: auto 1fr auto;
        grid-template-areas: "counter filters clearBtn";
    }
`;


export const ItemsCounter = styled('div')`
    grid-area: counter;
    width: 7rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    padding-left: ${({ theme }) => theme.spacing(1)};
`;

export const Filters = styled('div')`
    grid-area: filters;
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const ClearButton = styled(Button)`
    grid-area: clearBtn;
    white-space: nowrap;
`;

export const FilterButton = styled(Button,
  {
    shouldForwardProp: (prop) => prop !== "isSelected"
  })<{ isSelected: boolean }>`
    color: ${({ theme }) => theme.palette.text.secondary};
    outline: ${({ isSelected }) => isSelected ? `2px solid ${lighten(colors.orange, 0.6)}` : undefined};
`;


const getItemsLeftText = (count: number) => {
  switch (count) {
    case 0:
      return `No items left`;
    case 1:
      return `1 item left`;
  }
  return `${count} items left`;
}

export type FilterType = 'completed' | 'active' | 'none';

export interface ActionBarProps {
  itemsLeftCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClear: () => void;
}

export const ActionBar = (props: ActionBarProps) => {

  const { itemsLeftCount, filter, onFilterChange, onClear } = props;

  const handleFilterChange = (type: FilterType) => () => {
    onFilterChange(type);
  }

  return <Root>
    <ItemsCounter data-testid='leftItemsCount'>{getItemsLeftText(itemsLeftCount)}</ItemsCounter>
    <Filters>
      <FilterButton isSelected={filter === 'none'} onClick={handleFilterChange('none')}>All</FilterButton>
      <FilterButton isSelected={filter === 'active'} onClick={handleFilterChange('active')}>Active</FilterButton>
      <FilterButton isSelected={filter === 'completed'} onClick={handleFilterChange('completed')}>Completed</FilterButton>
    </Filters>
    <ClearButton variant='outlined' onClick={onClear}>Clear completed</ClearButton>
  </Root>
}
