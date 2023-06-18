import { BrowserRouter as Router, Routes, Route } from "vue-router-dom"
import Home from "./Home"
import NotFound from "./NotFound"

export default {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        )
    }
}
