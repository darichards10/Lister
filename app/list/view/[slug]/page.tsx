export default function Page({ params }: { params: { slug: string } }) {
  return <div>My card: {params.slug}</div>
}