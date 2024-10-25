export default <T>(params: any) => {
    const where:any = {};
    const pagination: any = {
        take: 10,
        skip: 0
    }
    const include: any = {};

    const keys = Object.keys(params);

    keys.forEach(key => {
        if (key === "includes") {
            const values = `${params[key]}`.split(',');

            values.forEach((v: string) => {
                include[v] = true;
            });

        }

        if (key === 'limit') {
            pagination['take'] = +(params[key] ?? 10);
        }

        if (key === 'page') {
            pagination['skip'] = (params[key] - 1) * (pagination['take'] ?? params['limit'] ?? 10);
        }

        
        if (key.endsWith('_eq')) {
            where[key.replace('_eq', '')] = params[key];
        }
        
        if (key.endsWith('_neq')) {
            where[key.replace('_neq', '')] = { not: params[key] };
        }
        
        if (key.endsWith('_starts_with')) {
            where[key.replace('_starts_with', '')] = { startsWith: params[key] };
        }

        if (key.endsWith('_not_starts_with')) {
            where[key.replace('_not_starts_with', '')] = { not: { startsWith: params[key] } };
        }

        if (key.endsWith('_ends_with')) {
            where[key.replace('_ends_with', '')] = { endsWith: params[key] };
        }

        if (key.endsWith('_not_ends_with')) {
            where[key.replace('_not_ends_with', '')] = { not: { endsWith: params[key] } };
        }

        if (key.endsWith('_is')) {
            where[key.replace('_is', '')] = { is: params[key] };
        }

        if (key.endsWith('_not_is')) {
            where[key.replace('_not_is', '')] = { not: { is: params[key] } };
        }

        if (key.endsWith('_is_empty')) {
            where[key.replace('_is_empty', '')] = { isEmpty: params[key] };
        }

        if (key.endsWith('_is_set')) {
            where[key.replace('_is_set', '')] = { isSet: params[key] };
        }

        if (key.endsWith('_in')) {
            const field = key.replace('_in', '');
            let values: any = `${params[key]}`.split(',');

            if (field === 'id') {
                values = values.map(v => parseInt(v));
            }
            
            where[key.replace('_in', '')] = { in: values };
        }

        if (key.endsWith('_not_in')) {
            where[key.replace('_not_in', '')] = { notIn: params[key] };
        }

        if (key.endsWith('_lt')) {
            let value = params[key];

            where[key.replace('_lt', '')] = { lt: value };
        }

        if (key.endsWith('_lte')) {
            where[key.replace('_lte', '')] = { lte: params[key] };
        }

        if (key.endsWith('_gt')) {
            where[key.replace('_gt', '')] = { gt: params[key] };
        }

        if (key.endsWith('_gte')) {
            where[key.replace('_gte', '')] = { gte: params[key] };
        }

        if (key.endsWith('_contains')) {
            where[key.replace('_contains', '')] = { contains: params[key] };
        }

        if (key.endsWith('_not_contains')) {
            where[key.replace('_not_contains', '')] = { not: { contains: params[key] } };
        }
    });

    return { where, pagination, include };
}