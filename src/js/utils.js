export const getFileType = (filePath) =>{
    var splits = filePath.toLowerCase().split('.');
    const ext = splits[splits.length-1];
    if (['mov', 'mp4','avi'].includes(ext) ){
      return 'video'
    }
    else{
      return 'img' 
    }
  }