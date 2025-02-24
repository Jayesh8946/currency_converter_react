import {useEffect, useState } from "react";

function useCurrencyInfo (currency) {

    const[data, setData] = useState({})

    useEffect( ()=>{

        

        fetch(`https://v6.exchangerate-api.com/v6/2fe084105a5a01cf641cf25d/latest/${currency}`)
        .then((res)=> res.json()) //here we need to convert it into json because most api values comes in json format, and we need to handle it and convert it into json format.
        .then((res)=> {
            if (res && res["conversion_rates"]) {
                setData(res["conversion_rates"]); // Use `conversion_rates`, the correct API response field
            } else {
                setData({}); // Fallback to empty object
            }
        })
        .catch((error) => {
            console.error("Error fetching currency data:", error);
            setData({}); // Handle error by setting data to an empty object
        });

        console.log(data);
        
    }, [currency])

   
    return data;
    
}

export default useCurrencyInfo;









//Logic👇👇👇👇👇👇👇👇👇👇👇👇👇👇
// import {useEffect, useState } from "react";

// function useCurrencyInfo (currency) {

//     const[data, setData] = useState({})

//     useEffect( ()=>{

        

//         fetch(https://v6.exchangerate-api.com/v6/2fe084105a5a01cf641cf25d/latest/${currency})
//         .then((res)=> res.json()) //here we need to convert it into json because most api values comes in json format, and we need to handle it and convert it into json format.
//         .then((res)=> {
//             if (res && res["conversion_rates"]) {
//                 setData(res["conversion_rates"]); // Use conversion_rates, the correct API response field
//             } else {
//                 setData({}); // Fallback to empty object
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching currency data:", error);
//             setData({}); // Handle error by setting data to an empty object
//         });

//         console.log(data);
        
//     }, [currency])

   
//     return data;
    
// }

// export default useCurrencyInfo;


// instead of returning data, can i do this---- return [data, setData] and if not they why?
// ChatGPT said:
// Yes, you can return [data, setData] instead of just data, but it's not recommended in this case. Here's why:

// 1. Custom Hook Pattern
// Custom hooks in React usually encapsulate logic and return only necessary values.
// useCurrencyInfo is designed to fetch currency exchange rates, and consumers of this hook should not directly modify data—they should only read it.
// 2. setData Would Break Encapsulation
// If you return [data, setData], a component using this hook might manually modify data instead of relying on the API response.
// This could lead to inconsistent state and unintended behavior (e.g., a component might override exchange rates manually, which doesn't make sense).
// 3. Side Effects and UseEffect
// The hook fetches data when currency changes. If an external component modifies data via setData, the API might not refetch new values properly, leading to stale or incorrect data.
// ✅ Best Practice: Return Only Data
// Returning only data ensures that the hook remains responsible for handling currency rates. The component using it should simply consume the data without modifying it.

// 🚀 Alternative: If You Need Manual Updates
// If you need to manually refresh or modify data (e.g., allow the user to refresh rates), you can expose a refresh function:

// js
// Copy
// Edit
// function useCurrencyInfo(currency) {
//     const [data, setData] = useState({});

//     const fetchData = () => {
//         fetch(`https://v6.exchangerate-api.com/v6/2fe084105a5a01cf641cf25d/latest/${currency}`)
//             .then((res) => res.json())
//             .then((res) => {
//                 if (res && res["conversion_rates"]) {
//                     setData(res["conversion_rates"]);
//                 } else {
//                     setData({});
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching currency data:", error);
//                 setData({});
//             });
//     };

//     useEffect(() => {
//         fetchData();
//     }, [currency]);

//     return { data, refresh: fetchData };
// }

// export default useCurrencyInfo;
// ✅ Benefits of This Approach
// The consumer can read data but cannot modify it directly.
// If manual updates are needed, the refresh function ensures controlled updates.
// Would you like me to refactor it further to suit your needs? 🚀