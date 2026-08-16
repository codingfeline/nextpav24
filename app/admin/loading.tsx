import Spinner from '@/app/components/Spinner'

const AdminLoading = () => (
  <div className="w-full mt-8 flex items-center justify-center gap-2 text-brown">
    <Spinner />
    Loading menu…
  </div>
)

export default AdminLoading
