import * as Loader from 'react-loader-spinner';

function Loading(props){
  const { size } = props;
  
  return (
    <Loader.ThreeDots color='#FFFFFF' height={size} width={size} />
  );
}

export default Loading;

