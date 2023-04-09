export const convertSizeFile = (size) => {
  /**
   * default, size of file will limit at 5MB
   * this function will convert B to MB
   */
  const kb = Math.floor(size / 1024);
  const mb = kb / 1024;
  if (mb < 1) {
    return `${kb}KB`;
  } else {
    return `${mb}MB`;
  }
}

export const getImageUrl = (user) => {
  if (!user.avatar) {
    throw new Error("Not Found user.avatar: " + user.avatar);
  }
  return `${process.env.REACT_APP_BASE_URL}image/${user.avatar}`;
}
