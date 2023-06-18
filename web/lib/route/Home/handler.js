export class NotFoundError extends Error {}

export const submitRegistration = async (registrationId, emailAddress) => {
    const body = {
        registrationId: registrationId,
        emailAddress: emailAddress
    }
    const response = await fetch("http://localhost:9292", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message)
    }

    const location = response.headers.get("location")
    return {
        location
    }
}

export const queryRegistration = async (location) => {
    const response = await fetch(location, {
        method: 'GET'
    })

    if (response.status === 404) {
        throw new NotFoundError()
    }

    if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message)
    }

    const data = await response.json()

    return {
        isRegistered: data.is_registered,
        isEmailRejected: data.is_email_rejected,
    }
}
