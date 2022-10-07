class PaymentController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async getPaymentLink(res, req) {
        try {
            const payment = await this.subscriptionService.createPayment();
            return res.json(payment);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'Failed to create payment'
            })
        }
    }

    // async getSubscriptionLink(res, req) {
    //     try {
    //         const subscription = await this.subscriptionService.createSubscription();
    //         return res.json(subscription);
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             error: true,
    //             message: 'Failed to create subscription'
    //         })
    //     }
    // }
}

module.exports = PaymentController;