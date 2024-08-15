import axios from 'axios'

interface GovRecord {
    rank: number
    סמל_ישוב: string
    סמל_רחוב: string
    שם_ישוב: string
    שם_רחוב: string
}

export async function fetchCities() {
    let newCities: any = []
    const data = {
        resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
        limit: 100000,
    }
    try {
        const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        const cities: GovRecord[] = response.data.result.records
        newCities = cities.map((city: GovRecord) => {
            return city.שם_ישוב
        })
        return newCities
    } catch {
        throw new Error('Failed to fetch cities')
    }
}

export async function fetchStreets(selectedCity: string): Promise<string[]> {
    if (!selectedCity) return []
    let newStreets: string[] = []
    const data = {
        resource_id: '9ad3862c-8391-4b2f-84a4-2d4c68625f4b',
        limit: 100000,
        q: selectedCity,
    }
    try {
        const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        const records: GovRecord[] = response.data.result.records
        if (records.length > 0) {
            newStreets = records.map((record: GovRecord) => record.שם_רחוב)
            return newStreets
        }
        return []
    } catch (error) {
        throw new Error('Failed to fetch streets')
    }
}
