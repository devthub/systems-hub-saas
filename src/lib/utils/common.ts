/* eslint-disable no-useless-escape */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isEmpty = (value: object | string) =>
  !value ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const sortObjectArrayWithKeyAsString = (key: string, ObjArray: any[]) => {
  if (!ObjArray) return null;

  return ObjArray && ObjArray.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
};

export const binaryFind = (target: any[], key: string) => {
  let start = 0,
    end = target.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (target[middle] === key) {
      return middle;
    } else if (target[middle] < key) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }

    return -1;
  }
};

export function titleCase(myStr: string) {
  if (isEmpty(myStr)) return '';

  return myStr
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}

export function slugify(string: string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function makeMenuLinkItem(menuTitle: string, parent: string) {
  if (isEmpty(menuTitle)) return '';

  return {
    title: titleCase(menuTitle),
    id: `/${parent}/${slugify(menuTitle)}`,
    linkTo: `` + '/${locationSlug}' + `/${parent}/${slugify(menuTitle)}`,
  };
}

export const reOrder = (list: object[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const replaceItemInArray = ({
  source,
  replacement,
  index,
}: {
  source: object[];
  replacement: object;
  index: number;
}) => {
  const newList = Array.from(source);
  newList.splice(index, 1);
  newList.splice(index, 0, replacement);

  return newList;
};

export const replaceItemInArrayOfType = <T>({
  source,
  replacement,
  index,
}: {
  source: T[];
  replacement: T;
  index: number;
}): T[] => {
  const updatedArray = [
    ...source.slice(0, index), // Items before the updated item
    replacement,
    ...source.slice(index + 1), // Items after the updated item
  ];

  return updatedArray;
};

export const moveItem = (
  source: { withSubmenus: object[] },
  destination: { withSubmenus: object[] },
  droppableSource: { index: number; droppableId: string | number },
  droppableDestination: { index: number; droppableId: string | number }
) => {
  const sourceClone = Array.from(source.withSubmenus || []);
  const destClone = Array.from(destination.withSubmenus || []);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: { withSubmenus: object[] } } = {};
  result[droppableSource.droppableId] = {
    ...source,
    withSubmenus: sourceClone,
  };
  result[droppableDestination.droppableId] = {
    ...destination,
    withSubmenus: destClone,
  };

  return result;
};

export const serializeFields = (obj: any): any => {
  const serialized: any = {};
  Object.keys(obj).forEach((key: string) => {
    let val: any = obj[key];
    if (val !== null) {
      if (Array.isArray(val)) {
        // Loop through array
        val = val.map((item: any) => serializeFields(item));
      } else if (typeof val === 'object' && typeof val.getMonth === 'function') {
        // Perform the serialization
        val = JSON.parse(JSON.stringify(val));
      } else if (typeof val === 'object') {
        // Recurse nested object
        val = serializeFields(val);
      }
    }
    serialized[key] = val;
  });
  return serialized;
};

// export interface FlatCategoryItem {
//   _id: string;
//   title: string;
//   description: string;
//   author: string;
//   parent?: string | null;
//   children?: FlatCategoryItem[] | null;
//   slug?: string;
//   linkTo?: string;
// }

// const flatCategoryChildren = (
//   t: ICategory,
//   locationSlug: string,
// ): FlatCategoryItem => {
//   const parentLink = `${locationSlug}/categories/`;

//   return {
//     _id: t?._id,
//     author: t?.author?.username,
//     title: t?.title,
//     description: t?.description,
//     parent: (t?.parent as ICategory)?.title,
//     slug: t?.slug,
//     linkTo: `/${parentLink}${t?.slug}?id=${t?._id}`,
//     children:
//       t?.children && t?.children?.length && t?.children?.length > 0
//         ? t?.children?.map((t) => flatCategoryChildren(t, locationSlug))
//         : null,
//   };
// };

// export function getFlatCategoryData(
//   dataArr: ICategory[],
//   locationSlug: string,
// ): FlatCategoryItem[] {
//   const tData = buildHierarchyTree<ICategory>(dataArr as ICategory[], null);

//   const tree = tData?.map((t) => flatCategoryChildren(t, locationSlug));

//   return tree;
// }

export const atLeastTwoWords = /(\w.+\s).+/; //Regex to confirm if the string have at least two words
export const onlyOneWord = /^\b[a-zA-Z0-9_]+\b$/;

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_');
}
