export const dynamic = 'force-dynamic' 

// call this via fetch('/api/events')
export async function POST(request: Request) {
    console.log(request.formData);
    
}