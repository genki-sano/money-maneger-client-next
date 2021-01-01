import { NextPage, GetServerSideProps } from 'next'
import moment from 'moment'

const Index: NextPage = () => {
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const date = moment().format('YYYYMM')
  return {
    redirect: {
      destination: `/payments/${date}`,
      permanent: false,
    },
  }
}
export default Index
