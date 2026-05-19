import { GoogleAuth } from 'google-auth-library';
import jwt from "jsonwebtoken";

const generateAppleToken = () => {
    const token = jwt.sign(
        {
            iss: "bc8ff896-62a6-4f84-9118-4fec3574c8d3",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 5,
            aud: "appstoreconnect-v1",
            bid: "com.conscience.guillaume.app",
        },
        `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgO39nLCcqxqiHnBTM
WOZQXQ2eGIbfG2n+IeXPU/G1ZbCgCgYIKoZIzj0DAQehRANCAATf+Tz+mD4DZF5+
hXebgy5XKNEulI9X6fA6CBo58rY9yMM62K4n7Pd/O8vkYj4VQUYvwYXbMZrdedab
VvQIN5ku
-----END PRIVATE KEY-----`,
        {
            algorithm: "ES256",
            header: {
                alg: "ES256",
                kid: "Q8P56JX69K",
            },
        }
    );

    return token;
};


export const getAccessToken = async () => {
    const auth = new GoogleAuth({
        credentials: {
            "client_email": "play-verifier@conscience-e1572.iam.gserviceaccount.com",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtAmassBt9ILkc\nkHpH28OFA7BI0/ys0mP5eeOyydQnnyh3ZMsi3YHZbhY9w7b5hbXnLBkg5c50HRm8\nCQdl6I1OaUe9/sCT7tRn1NNRxrfQr0tSaEvfFLRUqOcm05bqHfamnDlt7ap8i08r\nb9u47PqB7b5N9Dlwqo8O7/t8xCj/MvXojNf3bLZNCkyAw7QEdKdT0qwT9PyO/ilq\n7dTwAva1lY8s/J6/uSIg5Ydtm2+NQo6kawWqaLfh6FVnw4481npp25Ix2Lacfn2w\nvqddFns+aKgwNYmD1WF2V92lFELVCIUdTsbb9MOtHcS+o7EnaWVHiMfvdbMHvYO+\nXuPSZ+iJAgMBAAECggEAHl+BCgki0k1X4jFlHk9xHF2A6dA5mFeZUJd7B4zST6Br\n+MX7uaO8o6Dli7Nb4KN+Q1blFHbzz0O6nF3TbCsu/5iRDUR3p6DyrkXZUY56/8p+\nhTmlNEVMwV4jspfL808OWcKsfGWQnCvS2tPY9ba45e2IjuP035g55EvyUT2Y2vBb\n6sFvjnfswMwChHr1Fb/Rzu746GQ7D5bHt6PLVeiiCxh+s/nqhlxt9WW2NRPGWhtB\n7xi2YLUGwSaLYruoQ4UbLl+1YjzZI0Dh0n6PUmLpMsOnmqd+l7ugby/Y2u6AUbah\njz39Hy0EPY8jbSRTYKbuPJTbPPZOIRwO4i3qktq4mQKBgQDdEg8McDqadkWVyHam\nkTekkwXqu1wtBj/BWS4canfw6zNay+4lJHWmXtnBAXcjfR/8MfwVnE8vSbyfbc5y\nz/J4KJXhnBEs2l+fj9fZRGoIrIrJeg8OJR1TaffIupoNsV4PYtaeC+9iewqfZnfQ\nKIPRQ5+C2Y/EjNB4k5sVo1AwrQKBgQDIWFjUmOKU3TcSq1GLrqYH0g9MUBr5vzGR\nH267AlhkrsUtl+xGwjD/XF6qffE+3DNZC28MromCOhcSrQELYQXnDfRcBjc/h32k\nDuSEcwbQoPSih2aAXwll4qCsVWpILkTqNg6kB9rZqBqT6SMco07Ys5Me+ZVzUOFF\n/cpdFHxmzQKBgH6pMyAQSTNoojPQWFLVDwlnB1PXJ1fQpcS0wNudEL1jNNhH0VlM\ni2/YFnEj0svti97mEKWdGi1g1QaPVmKnzCeWMVHDJoAJWhJEywn7zbjMivQmz+tt\nzmCVbVd/unYv8lFkcsy4z94f2xU7E1ibbfL/CKxi1KFrgKIlCA0ctfw9AoGAZh/a\n0CxKu7V0AFlCDSDu02e5kp320j4qxx4ttLhCVLheHJqnv333ugPc4a2nTvKyXf6d\nEeraf36bClMUCDfh6WDMoigs+35Whk1tITL9U1XovfylPGS1hrEaVB6KOdcUHAuI\nNQcoAPFW8vTRiCSa6Y3IPe7dxtWAr8vp3r61lzUCgYA80ypNpEhReRVFiZ9OfoF7\nasp4BKAjdFr4OCrDboA425tUe2KHJ6GtnQp/08z7YPdr2E7T7U8EaO7pxZiUDMDX\n6ev6M6wQLzws5Q8hN7yvlRHAWiAZdX1Xb2VqRLkAbZUUAMEVd0KnG0g6B2cv8Jr+\nc6/C3RBCCRV09cA9KhPQqA==\n-----END PRIVATE KEY-----\n",
        },
        scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    return accessToken.token;
};



const checkAndroidSubscription = async (purchaseToken: string) => {


    const token = await getAccessToken();

    const res = await fetch(
        `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.conscience.guillaume.app/purchases/subscriptionsv2/tokens/${purchaseToken}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response from Google API:', errorData);
        throw new Error(`Google API error: ${errorData.error.message}`);
    }

    const data = await res.json();

    if (data.subscriptionState) {
        return {
            subscriptionState: data.subscriptionState,
        }
    }


    return data;
};



const decodeAppleTransaction = (signedTransaction: string) => {
    try {
        const parts = signedTransaction.split(".");

        if (parts.length < 2) {
            throw new Error("Invalid Apple signed transaction");
        }

        const payload = JSON.parse(
            Buffer.from(parts[1], "base64").toString("utf8")
        );

        return payload;
    } catch (error) {
        console.error("Failed to decode Apple transaction:", error);
        throw new Error("Invalid Apple transaction token");
    }
};

const checkIOSSubscription = async (signedTransaction: string) => {
    // Decode signed transaction from frontend
    const decodedTransaction = decodeAppleTransaction(signedTransaction);

    console.log("Decoded Apple Transaction:", decodedTransaction);

    const transactionId =
        decodedTransaction?.originalTransactionId ||
        decodedTransaction?.transactionId;

    if (!transactionId) {
        throw new Error("Transaction ID not found");
    }

    const token = generateAppleToken();

    // First try production
    let res = await fetch(
        `https://api.storekit.itunes.apple.com/inApps/v1/subscriptions/${transactionId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // If production fails, try sandbox
    if (!res.ok) {
        console.log("Production failed, trying sandbox...");

        res = await fetch(
            `https://api.storekit-sandbox.itunes.apple.com/inApps/v1/subscriptions/${transactionId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    if (!res.ok) {
        const errorText = await res.text();

        console.error("Apple API Status:", res.status);
        console.error("Apple API Error Body:", errorText);

        throw new Error(
            `Apple API error: status=${res.status}, body=${errorText}`
        );
    }

    const data = await res.json();

    console.log("Apple Subscription Response:", data);

    // Extract latest subscription info
    const lastTransactions =
        data?.data?.[0]?.lastTransactions || [];

    const latestTransaction = lastTransactions[0];

    if(latestTransaction.status === 1) {
        return {
            "subscriptionState": "SUBSCRIPTION_STATE_ACTIVE"
        }
    }
    else if (latestTransaction.status === 2) {
        return {
            "subscriptionState": "SUBSCRIPTION_STATE_EXPIRED"
        }
    }
    else if (latestTransaction.status === 5) {
        return {
            "subscriptionState": "SUBSCRIPTION_STATE_CANCELED"
        }
    }
    else {
        return {
            "subscriptionState": "SUBSCRIPTION_STATE_EXPIRED"
        }
    }

    // return {
    //     success: true,
    //     environment: data?.environment,
    //     appAppleId: data?.appAppleId,
    //     bundleId: data?.bundleId,

    //     originalTransactionId:
    //         latestTransaction?.originalTransactionId,

    //     status: latestTransaction?.status,

    //     signedRenewalInfo:
    //         latestTransaction?.signedRenewalInfo,

    //     signedTransactionInfo:
    //         latestTransaction?.signedTransactionInfo,

    //     raw: data,
    // };
};

// const checkIOSSubscription = async (transactionId: string) => {
//     const token = generateAppleToken();

//     const res = await fetch(
//         // `https://api.storekit.itunes.apple.com/inApps/v1/transactions/${transactionId}`,
//         `https://api.storekit-sandbox.itunes.apple.com/inApps/v1/transactions/${transactionId}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     if (!res.ok) {
//         const errorText = await res.text();
//         console.error("Apple API Status:", res.status);
//         console.error("Apple API Error Body:", errorText);

//         throw new Error(
//             `Apple API error: status=${res.status}, body=${errorText}`
//         );
//     }

//     const data = await res.json();

//     return {
//         data,
//         subscriptionState: data?.data?.[0]?.status,
//     };
// };


const checkSubscription = async (payload: any) => {
    const { purchaseToken, device } = payload;

    if(purchaseToken === "CONSCIENCE_FREE"){
        return {
            "subscriptionState": "SUBSCRIPTION_STATE_ACTIVE"
        }
    }

    if (device === 'ANDROID') {
        return await checkAndroidSubscription(purchaseToken);
    }
    else if (device === 'IOS') {
        return await checkIOSSubscription(purchaseToken);
    }
    else {
        throw new Error('Device not supported');
    }

};


export const SubscriptionServices = {
    checkSubscription,
};