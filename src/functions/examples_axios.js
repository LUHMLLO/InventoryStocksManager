import axios from 'axios'
import { toggleLoading, toggleError, replaceSpacesForDash, removeSpecialCharacters } from '@/functions'

export const fetchDataFromApi = (type, offset, limit, listOfArticles) => {
    let startPath = ''
    type != 'products' ? (startPath = 'https://f658-152-166-116-41.ngrok.io') : ''
    toggleLoading()
    axios
        .get(`https://f658-152-166-116-41.ngrok.io/api/v1/${type}?offset=${offset}&limit=${limit}`)
        .then(function (response) {
            response.data.data.forEach((element) => {
                listOfArticles.push({
                    merchant: {
                        avatar: 'https://f658-152-166-116-41.ngrok.io' + element.avatar,
                        name: element.merchantName || element.companyBrand,
                        about: element.aboutBrand,
                    },
                    item: {
                        thumbnail: startPath + element.imageUrl,
                        name: element.productName,
                        description: element.descriptionLong || element.description,
                        code: element.couponCode,
                    },
                    prices: {
                        price: element.priceContent,
                        currency: element.priceCurrency,
                        salePrice: element.salePriceContent,
                        saleCurrency: element.salePriceCurrency,
                        discount: element.discount,
                    },
                    date: {
                        created: element.createDon,
                        start: element.startDate,
                        end: element.endDate,
                    },
                    categories: {
                        only: element.category,
                        primary: element.categoryPrimary,
                        secondary: element.categorySecondary,
                    },
                    url: {
                        id: element.linkId,
                        path: element.linkUrl || element.referralLink,
                    },
                    other: {
                        keywords: element.keywords,
                        sku: element.sku,
                        upcCode: element.upcCode,
                        promotiontypes: element.promotiontypes,
                    },
                    reference: {
                        mid: element.mid,
                        api: element.api,
                    },
                })
            })
        })
        .catch(function (error) {
            toggleError()
            console.log(error)
        })
        .then(function () {
            toggleLoading()
        })
}

export const matchDataWithParams = (articleMerchant, articleName, articleObject) => {
    toggleLoading()
    axios
        .get('https://f658-152-166-116-41.ngrok.io/api/v1/products')
        .then(function (response) {
            response.data.data.forEach((element) => {
                if (replaceSpacesForDash(element.merchantName).toLowerCase() == articleMerchant) {
                    if (removeSpecialCharacters(element.productName).toLowerCase() == articleName) {
                        articleObject.merchant = {
                            avatar: 'https://f658-152-166-116-41.ngrok.io' + element.avatar,
                            name: element.merchantName,
                            about: element.aboutBrand,
                            brand: element.companyBrand,
                        }
                        articleObject.item = {
                            thumbnail: element.imageUrl,
                            name: element.productName,
                            description: element.descriptionLong,
                            code: element.couponCode,
                        }
                        articleObject.prices = {
                            price: element.priceContent,
                            currency: element.priceCurrency,
                            salePrice: element.salePriceContent,
                            saleCurrency: element.salePriceCurrency,
                            discount: element.discount,
                        }
                        articleObject.date = {
                            created: element.createDon,
                            start: element.startDate,
                            end: element.endDate,
                        }
                        articleObject.categories = {
                            primary: element.categoryPrimary,
                            secondary: element.categorySecondary,
                        }
                        articleObject.url = {
                            id: element.linkId,
                            path: element.linkUrl,
                        }
                        articleObject.other = {
                            keywords: element.keywords,
                            sku: element.sku,
                            upcCode: element.upcCode,
                            promotiontypes: element.promotiontypes,
                        }
                        articleObject.reference = {
                            mid: element.mid,
                            api: element.api,
                        }
                    }
                }
            })
        })
        .catch(function (error) {
            toggleError()
            console.log(error)
        })
        .then(function () {
            toggleLoading()
        })
}
export const fetchRecommended = (api, mid, listOfArticles) => {
    let data = {
        api: api,
        mid: mid,
    }
    let headers = { 'content-type': 'application/json' }

    axios
        .post(`https://f658-152-166-116-41.ngrok.io/api/v1/advertisers/recommended`, data, headers)
        .then(function (response) {
            response.data.data.forEach((element) => {
                listOfArticles.push({
                    merchant: {
                        avatar: 'https://f658-152-166-116-41.ngrok.io' + element.avatar,
                        name: element.merchantName,
                        about: element.aboutBrand,
                        brand: element.companyBrand,
                    },
                    item: {
                        thumbnail: element.imageUrl,
                        name: element.productName,
                        description: element.descriptionLong,
                        code: element.couponCode,
                    },
                    prices: {
                        price: element.priceContent,
                        currency: element.priceCurrency,
                        salePrice: element.salePriceContent,
                        saleCurrency: element.salePriceCurrency,
                        discount: element.discount,
                    },
                    date: {
                        created: element.createDon,
                        start: element.startDate,
                        end: element.endDate,
                    },
                    categories: {
                        primary: element.categoryPrimary,
                        secondary: element.categorySecondary,
                    },
                    url: {
                        id: element.linkId,
                        path: element.linkUrl,
                    },
                    other: {
                        keywords: element.keywords,
                        sku: element.sku,
                        upcCode: element.upcCode,
                        promotiontypes: element.promotiontypes,
                    },
                    reference: {
                        mid: element.mid,
                        api: element.api,
                    },
                })
            })
        })
        .catch(function (error) {
            console.log(error)
        })
}
