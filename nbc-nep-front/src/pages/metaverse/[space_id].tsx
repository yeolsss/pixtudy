import CustomHead from '@/SEO/CustomHead'
import LoadingProgress from '@/components/common/loading/LoadingProgress'
import dynamic from 'next/dynamic'

const GameComponentWithNoSSR = dynamic(
  () => import('@/components/metaverse/MetaverseComponent'),
  {
    ssr: false,
    loading: () => <LoadingProgress />
  }
)

export default function Metaverse() {
  return (
    <>
      <CustomHead
        title={'Metaverse'}
        description={'메타버스 공간 페이지입니다.'}
      />
      <GameComponentWithNoSSR />
    </>
  )
}
export const getServerSideProps = async () => {
  return { props: {} }
}
