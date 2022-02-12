import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../account/selectors";

export interface IsInWishlistHookProps {
	productId: string;
}

export const useIsInWishlist = ({
	productId
}: IsInWishlistHookProps): boolean => {
	const currentUser = useSelector(getUser);
	const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
		if (currentUser && currentUser.wishlist) {
			const rez = currentUser.wishlist.filter((item) => item.id === productId);

			setInWishlist(rez.length > 0);
		} else {
			setInWishlist(false);
		}
    }, [currentUser, productId]);

    return inWishlist;
};
