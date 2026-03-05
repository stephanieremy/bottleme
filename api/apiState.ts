import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {Bottle} from "./schema";

const BOTTLE_QUERY = 'bottles'

const _getAllBottles = async (): Promise<Array<Bottle>> => {
    const response = await fetch(
        'http://10.0.2.2:8080/api/bottle',
        { method: 'GET', credentials: 'include' }
    )
    if (!response.ok) throw new Error('Service webApi GET bottles failed')
    return response.json()
}

const _getBottle = async (id: string): Promise<Bottle> => {
    const response = await fetch(
        `http://10.0.2.2:8080/api/bottle/${id}`,
        { method: 'GET', credentials: 'include' }
    )
    if (!response.ok) throw new Error('Service webApi GET bottle failed')
    return response.json()
}

const _createBottle = async (bottle: Omit<Bottle, 'id'>): Promise<Bottle> => {
    const response = await fetch(
        'http://10.0.2.2:8080/api/bottle',
        {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bottle)
        }
    )
    if (!response.ok) throw new Error('Service webApi POST bottle failed')
    return response.json()
}

const _updateBottle = async ({ id, ...bottle }: Bottle): Promise<Bottle> => {
    const response = await fetch(
        `http://10.0.2.2:8080/api/bottle/${id}`,
        {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bottle)
        }
    )
    if (!response.ok) throw new Error('Service webApi PUT bottle failed')
    return response.json()
}

const _deleteBottle = async (id: string): Promise<void> => {
    const response = await fetch(
        `http://10.0.2.2:8080/api/bottle/${id}`,
        { method: 'DELETE', credentials: 'include' }
    )
    if (!response.ok) throw new Error('Service webApi DELETE bottle failed')
}

export function useBottlesService(id?: string) {
    const queryClient = useQueryClient()

    const getAllBottles = useQuery({
        queryKey: [BOTTLE_QUERY],
        queryFn: _getAllBottles,
        staleTime: Infinity
    })

    const getBottle = useQuery({
        queryKey: [BOTTLE_QUERY, id],
        queryFn: () => _getBottle(id!),
        enabled: !!id,
        staleTime: Infinity
    })

    const createBottle = useMutation({
        mutationFn: _createBottle,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOTTLE_QUERY] })
    })

    const updateBottle = useMutation({
        mutationFn: _updateBottle,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOTTLE_QUERY] })
    })

    const deleteBottle = useMutation({
        mutationFn: _deleteBottle,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOTTLE_QUERY] })
    })

    return {
        getAllBottles,
        getBottle,
        createBottle,
        updateBottle,
        deleteBottle
    }
}