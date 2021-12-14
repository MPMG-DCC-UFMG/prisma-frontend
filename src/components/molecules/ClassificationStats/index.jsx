import { Progress, Tooltip } from 'antd';

export const calcProgress = (correspondents_count, users_per_segment, project_users_count, labeled_count) => (
  Math.round(labeled_count / (correspondents_count / project_users_count * users_per_segment) * 100)
);

export default function ClassificationStats(props) {

  return (<>
    <div style={{ width: '120px', marginRight: '1rem' }}>
      <Tooltip title="Seu progresso pessoal">
        <Progress strokeColor="orange" percent={calcProgress(
          props.correspondents_count,
          props.users_per_segment,
          props.project_users_count,
          props.correspondents_labeled_by_user_count
        )} />
      </Tooltip>
    </div>
    <div style={{ width: '120px' }}>
      <Tooltip title="Progresso do documento">
        <Progress percent={calcProgress(
          props.correspondents_count,
          props.users_per_segment,
          1,
          props.correspondents_labeled_count
        )} />
      </Tooltip>
    </div>
  </>);
}