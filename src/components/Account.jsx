import axios from "axios";

export function Account() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

      
    return (
        <div>
        <div className="account-page-container">
        <h2>Login</h2>
        <form className="user-form">
            <div className="form-group">
                <label htmlFor="name">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your Email:"/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password:"/>
            </div>
            <div className="form-group">
                <label htmlFor="office">Office Number:</label>
                <select id="office" name="office">
                    <option value="">Select Office</option>
                    <option value="01">01 - CEO</option>
                    <option value="02">02 - CFO</option>
                    <option value="03">03 - COO</option>
                    <option value="04">04 - CTO</option>
                    <option value="05">05 - IT</option>
                    <option value="06">06 - Finance</option>
                    <option value="07">07 - meeting Room</option>
                    <option value="08">08 - Supply chain</option>
                    <option value="09">09 - comercial</option>
                    <option value="10">10 - HR</option>
                    <option value="11">11 - test</option>
                    <option value="12">12 - test</option>
                </select>
            </div>
            <div className="login-btn-container" >
                <button className="login-btn">Login</button>
                <button className="login-btn">Guest</button>
            </div>
        </form>
    </div>
    </div>
    );
}