import { ActionBar } from "../../../components/actionBar/ActionBar.tsx";

export const ActionBarStory = () => {

  return (<div style={{ minWidth: "600px" }}>
    <ActionBar itemsLeftCount={0} filter='none' onFilterChange={() => void 0} onClear={() => void 0}/>
    <ActionBar itemsLeftCount={1} filter='active' onFilterChange={() => void 0} onClear={() => void 0}/>
    <ActionBar itemsLeftCount={2} filter='completed' onFilterChange={() => void 0} onClear={() => void 0}/>
  </div>);
};
