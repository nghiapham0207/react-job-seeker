import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAxiosJwt, get, path } from '../../utils/axiosAPI';
import { selectAccessToken, selectRefreshToken } from '../../redux/selector';

export default function MyApplicationsPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refressToken = useSelector(selectRefreshToken);
  useEffect(() => {
    const fetchData = async () => {
      const axiosInstance = createAxiosJwt(accessToken, refressToken, dispatch);
      try {
        const res = await get(path.application, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }, axiosInstance);
        console.log(res.message);
      } catch (error) {
        console.log(error);
      } finally {

      }
    }
    fetchData();
  }, [accessToken, refressToken, dispatch]);
  return (
    <div>
      MyApplicationsPage
    </div>
  )
}