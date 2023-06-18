export const useRetry = () => {
    const sleep = (interval) => {
        return new Promise((resolve) => {
            setTimeout(resolve, interval)
        })
    }

    const retry = async (errorTypes, millisecondInterval, operation) => {
        const isRetryType = (error) => errorTypes.some(type => error instanceof type)
        const intervals = millisecondInterval[Symbol.iterator()]
        const tryOperation = async () => {
            try {
                return await operation()

            }catch (err) {
                if (!isRetryType(err)) {
                    throw err
                }
            }
        }
        while (true) {
            const success = await tryOperation()

            if(success) {
                return success
            }

            const interval = intervals.next()

            if (interval.done) {
                throw new Error("No more retries")
            }

            await sleep(interval.value)
        }
    }

    return {
        retry
    }
}
