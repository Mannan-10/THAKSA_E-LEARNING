import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyOtp } from "../services/userServices";

export default function VerifyOtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        try {
            setLoading(true);
            const data = await verifyOtp({email, otp});
            console.log("OTP VERIFICATION RESPONSE:", data);

            if (data) {
                alert("OTP verified successfully");
                navigate("/login");
            } else {
                alert(data.message || "Invalid OTP");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during OTP verification");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return <h3>Email not found. Please register again.</h3>
    }

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h2>Verify OTP</h2>
            <p>OTP sent to {email}</p>
            <form onSubmit={handleVerify}>
                <input 
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <br /><br />
                <button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </form>
        </div>
    )
}