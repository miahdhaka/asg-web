import Image from "next/image";
import Link from "next/link";
import type { Job } from "./careerData";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex flex-col gap-6 bg-gray-50 p-4 lg:gap-[2.1667rem] lg:p-[1.3333rem]">
      <div className="flex flex-col gap-6 lg:gap-[2.3333rem]">
        <div className="flex flex-col gap-6 lg:gap-[2.3333rem]">
          {/* Badge + role */}
          <div className="flex flex-col gap-2">
            <span className="w-fit bg-gray-100 px-[0.6667rem] py-[0.3333rem] text-xs text-neutral-800 lg:text-[1rem]">
              {job.department}
            </span>
            <h3 className="font-test-tiempos-fine text-xl leading-7 text-neutral-800 lg:text-[2rem] lg:leading-[2.6667rem]">
              {job.title}
            </h3>
          </div>

          <hr className="border-t border-gray-100" />

          {/* Location / workplace / deadline */}
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-1 text-xs text-neutral-500 lg:text-[1rem] lg:leading-[1.3333rem]">
              <Image src="/icons/career/location.svg" alt="" width={14} height={14} quality={100} className="size-3.5 shrink-0" />
              {job.location}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="flex items-center gap-1 text-xs text-neutral-500 lg:text-[1rem] lg:leading-[1.3333rem]">
                <Image src="/icons/career/briefcase.svg" alt="" width={18} height={18} quality={100} className="size-4 shrink-0 lg:size-[1.5rem]" />
                {job.workplace} &middot; {job.employment}
              </p>
              <p className="flex items-center gap-1 text-xs text-neutral-500 lg:text-[1rem] lg:leading-[1.3333rem]">
                <Image src="/icons/career/briefcase.svg" alt="" width={18} height={18} quality={100} className="size-4 shrink-0 lg:size-[1.5rem]" />
                Deadline: {job.deadline}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 lg:gap-[1.0833rem]">
          <Link
            href={`/careers/${job.id}`}
            className="flex-1 cursor-pointer bg-gray-100 px-4 py-2 text-center text-xs font-medium text-neutral-800 lg:px-[2rem] lg:py-[0.6667rem] lg:text-[1rem]"
          >
            Job Details
          </Link>
          <Link
            href={`/careers/${job.id}`}
            data-label="Apply Now"
            className="primary-btn-flip-gradient w-[11.3333rem] shrink-0 cursor-pointer px-4 py-2 text-xs font-medium lg:px-[2rem] lg:py-[0.6667rem] lg:text-[1rem]"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}
