import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"
import { NotFoundError, submitRegistration, queryRegistration } from "./handler"
import { useRetry } from "/lib/retry";
export default {
    setup() {
        const emailAddressInput = ref("")
        let registrationId = uuidv4()
        let location
        let isEmailRejected
        let retryIntervals = [100, 200, 300, 500, 1000, 1000, 2000, 5000]


        const handleSubmit = async (e) => {
            e.preventDefault()
            console.log("UUID: ", registrationId)
            console.log("Email address: ", emailAddressInput.value)

            try {
                ({ location }) = await submitRegistration(registrationId, emailAddressInput.value);

                const operation = async () => await queryRegistration(location);

                ({ isEmailRejected }) = await useRetry([NotFoundError], retryIntervals, operation)
            } catch (err) {
                console.error("Error: ", err.message);

                return
            }

            if (isEmailRejected) {
                console.log("Email was rejected")
                return
            }

            console.log("Email address registration is successful");

        }
        return () => {
            return (
                <>
                    <div>
                        User Registration
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>Email Address</div>
                        <div>
                            <input type="text" v-model={emailAddressInput.value} name="email" id="email" placeholder="Email Address" />
                        </div>
                        <div>
                            <button type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                </>
            )
        }
    }
}
