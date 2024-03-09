export default function AnimationContainer({children}: Readonly<{children: React.ReactNode; }>) {
  return (
    <figure className="w-full mx-auto max-w-96 flex flex-col gap-2 sm:mx-0 sm:float-left">
      {children}
    </figure>
  )
}