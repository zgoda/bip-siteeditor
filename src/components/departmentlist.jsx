import { useContext } from 'preact/hooks';
import { AppState } from '../state';

export function DepartmentList() {
  const state = useContext(AppState);

  return (
    <>
      <h2>Działy</h2>
      <details>
        <summary>
          Działy organizacyjne instytucji wraz z danymi kontaktowymi pracowników
          {state.departmentsData.value.map((department) => {
            return <p key={department.name}>{department.name}</p>;
          })}
        </summary>
      </details>
      <button class="secondary outline autowidth">Dodaj dane kontaktowe działu</button>
    </>
  );
}
