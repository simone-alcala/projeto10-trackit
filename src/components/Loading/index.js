import {ThreeDots} from 'react-loader-spinner';

function Loading(props){
  const { size } = props;
  
  return (
    <ThreeDots color='#FFFFFF' height={size} width={size} />
  );
}

export default Loading;

