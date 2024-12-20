import ResetPasswordForm from '../../_components/ResetPasswordForm'

export default function ResetPage({
    params,
}: {
    params: { email: string }
}) {
    
    const email = decodeURIComponent(params.email as string)
    
    return (

        <div className='w-full min-h-[100vh] bg-no-repeat bg-cover bg-center flex items-center justify-center' style={{
            backgroundImage: "url('body.jpg')"
        }}>
            <div
                className='w-full sm:w-[348px] md:w-[405px] p-6 bg-white/70 sm:rounded-lg backdrop:blur-3xl'
                style={{
                    backdropFilter: 'blur(5px)'
                }}
            >
                <ResetPasswordForm email={email} />
            </div>
        </div>
    )
}
