import { styled, Button, lighten } from "@mui/material";
import { colors } from "../../styles/colors.ts";

export const Root = styled('div')`
    padding: 8px;
    display: flex;
    align-items: center;
`;

export const LeftContainer = styled('div')`
    flex: 1;
    color: ${({ theme }) => theme.palette.text.secondary};
`;

export const FilterButton = styled(Button,
  {
    shouldForwardProp: (prop) => prop !== "isSelected"
  })<{ isSelected: boolean }>`
    color: ${({ theme }) => theme.palette.text.secondary};
    outline: ${({ isSelected }) => isSelected ? `2px solid ${lighten(colors.orange, 0.6)}` : undefined};
`;

export const MiddleContainer = styled('div')`
    display: flex;
    gap: 3px;
`;

export const RightContainer = styled('div')`
    flex: 1;
    display: flex;
    justify-content: flex-end;
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
    <LeftContainer>{getItemsLeftText(itemsLeftCount)}</LeftContainer>
    <MiddleContainer>
      <FilterButton isSelected={filter === 'none'} onClick={handleFilterChange('none')}>All</FilterButton>
      <FilterButton isSelected={filter === 'active'} onClick={handleFilterChange('active')}>Active</FilterButton>
      <FilterButton isSelected={filter === 'completed'} onClick={handleFilterChange('completed')}>Completed</FilterButton>
    </MiddleContainer>
    <RightContainer>
      <Button onClick={onClear}>Clear completed</Button>
    </RightContainer>
  </Root>
}
